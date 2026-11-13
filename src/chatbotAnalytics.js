const MEASUREMENT_ID = 'G-EJX46WQQH7';
const TOPICS = ['experience', 'projects', 'skills', 'education', 'contact', 'personal', 'other'];
const SOURCES = ['launcher', 'page_cta', 'typed', 'suggestion'];
const PROMPTS = ['aws_experience', 'agentic_ai_skills', 'fun_facts'];
const ERRORS = ['http_error', 'network_error', 'invalid_response', 'empty_response', 'timeout'];
const EVENTS = ['chatbot_open', 'chatbot_message_sent', 'chatbot_reply_success', 'chatbot_error', 'chatbot_prompt_click'];

// Classification happens locally. Only this fixed label leaves the browser.
export function classifyTopic(text) {
  const rules = [
    ['projects', /\b(projects?|paysplit|finance|orchestrator|code review)\b/i],
    ['experience', /\b(experience|internships?|aws|amazon|lockheed|textron|work|jobs?|career)\b/i],
    ['skills', /\b(skills?|agentic|languages?|python|java|react|technologies|tech stack|rag|machine learning|ai)\b/i],
    ['education', /\b(education|purdue|university|degree|graduat\w*|major|courses?)\b/i],
    ['contact', /\b(contact|email|reach|linkedin|resume)\b/i],
    ['personal', /\b(fun|hobbies|hiking|coffee|favorite|favourite|sci-fi)\b/i],
  ];
  return rules.find(([, pattern]) => pattern.test(text))?.[0] || 'other';
}

// Explicit allowlists prevent prompts, replies, URLs, and error text being sent.
export function trackChatbot(event, params = {}) {
  try {
    if (typeof window === 'undefined' || !EVENTS.includes(event)) return;
    if (window.localStorage.getItem('ignore_analytics') === 'true' ||
        window[`ga-disable-${MEASUREMENT_ID}`] || typeof window.gtag !== 'function') return;
    const safe = { send_to: MEASUREMENT_ID };
    if (TOPICS.includes(params.topic)) safe.chatbot_topic = params.topic;
    if (SOURCES.includes(params.source)) safe.chatbot_source = params.source;
    if (PROMPTS.includes(params.prompt)) safe.chatbot_prompt = params.prompt;
    if (ERRORS.includes(params.errorType)) safe.chatbot_error_type = params.errorType;
    if (Number.isFinite(params.responseTimeMs) && params.responseTimeMs >= 0) {
      safe.chatbot_response_time_ms = Math.round(params.responseTimeMs);
    }
    window.gtag('event', event, safe);
  } catch {
    // Analytics failures must never interrupt the chat.
  }
}

export async function requestChatReply(url, payload, context) {
  const started = performance.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  let errorType = 'network_error';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) {
      errorType = 'http_error';
      throw new Error('Chat request failed');
    }
    errorType = 'invalid_response';
    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts
      ?.filter(part => !part.thought && typeof part.text === 'string')
      .map(part => part.text).join('\n').trim();
    if (!reply) {
      errorType = 'empty_response';
      throw new Error('No chat reply');
    }
    trackChatbot('chatbot_reply_success', { ...context, responseTimeMs: performance.now() - started });
    return reply;
  } catch (error) {
    trackChatbot('chatbot_error', {
      ...context,
      errorType: controller.signal.aborted ? 'timeout' : errorType,
      responseTimeMs: performance.now() - started,
    });
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
