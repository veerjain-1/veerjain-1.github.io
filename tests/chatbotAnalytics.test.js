import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { classifyTopic, trackChatbot, requestChatReply } from '../src/chatbotAnalytics.js';

let events;
const originalFetch = globalThis.fetch;
beforeEach(() => {
  events = [];
  globalThis.window = { localStorage: { getItem: () => null }, gtag: (...args) => events.push(args) };
});
afterEach(() => { delete globalThis.window; globalThis.fetch = originalFetch; });

test('topics are fixed categories, including suggestion topics and unmatched text', () => {
  for (const [text, topic] of [['AWS Experience','experience'], ['Agentic AI Skills','skills'], ['Fun Facts','personal'], ['show projects','projects'], ['Purdue degree','education'], ['contact email','contact'], ['hello secret@example.com','other']]) {
    assert.equal(classifyTopic(text), topic);
  }
});
test('only allowlisted metadata is sent; raw message and reply are dropped', () => {
  trackChatbot('chatbot_message_sent', { topic:'projects', source:'typed', text:'private', reply:'private', prompt:'private', errorType:'private' });
  assert.deepEqual(events, [['event','chatbot_message_sent',{send_to:'G-EJX46WQQH7',chatbot_topic:'projects',chatbot_source:'typed'}]]);
  trackChatbot('unapproved_event');
  assert.equal(events.length, 1);
});
test('opt-out, disabled GA, missing GA, blocked storage and broken analytics never break chat', () => {
  window.localStorage.getItem = () => 'true'; trackChatbot('chatbot_open');
  window.localStorage.getItem = () => null;
  window['ga-disable-G-EJX46WQQH7'] = true; trackChatbot('chatbot_open');
  delete window['ga-disable-G-EJX46WQQH7'];
  window.gtag = undefined; trackChatbot('chatbot_open');
  window.localStorage.getItem = () => {throw Error('blocked');}; trackChatbot('chatbot_open');
  assert.deepEqual(events, []);
});
test('successful reply emits exactly one success with duration, excluding thought text', async () => {
  globalThis.fetch = async () => ({ok:true,json:async()=>({candidates:[{content:{parts:[{thought:true,text:'internal'},{text:'Hello'},{text:'there'}]}}]})});
  assert.equal(await requestChatReply('/proxy', {}, {topic:'experience',source:'typed'}), 'Hello\nthere');
  assert.equal(events.length,1); assert.equal(events[0][1],'chatbot_reply_success');
  assert.equal(events[0][2].chatbot_topic,'experience');
  assert.ok(events[0][2].chatbot_response_time_ms >= 0);
});
for (const [kind, mock] of [
  ['http_error', async()=>({ok:false,status:429})],
  ['invalid_response', async()=>({ok:true,json:async()=>{throw SyntaxError('private body');}})],
  ['empty_response',async()=>({ok:true,json:async()=>({candidates:[]})})],
  ['network_error',async()=>{throw Error('private URL');}],
]) test(`${kind} emits one error and no success or private error text`, async()=>{
  globalThis.fetch=mock;
  await assert.rejects(requestChatReply('/proxy',{}, {topic:'other',source:'typed'}));
  assert.equal(events.length,1); assert.equal(events[0][1],'chatbot_error');
  assert.equal(events[0][2].chatbot_error_type,kind);
  assert.ok(!JSON.stringify(events).includes('private'));
});
test('aborted request is classified as timeout', async (t) => {
  t.mock.timers.enable({apis:['setTimeout']});
  globalThis.fetch=async (_url,{signal})=> new Promise((_resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted'))));
  const pending=assert.rejects(requestChatReply('/proxy',{},{}));
  t.mock.timers.tick(30000); await pending;
  assert.equal(events[0][2].chatbot_error_type,'timeout');
});
