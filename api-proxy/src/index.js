const RATE_LIMIT = 20; // max requests per window per IP
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const ALLOWED_ORIGINS = [
  'https://veerjain-1.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

// In-memory rate limiter (resets on worker cold start — fine for basic abuse prevention)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    // Only POST allowed
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Origin check
    const origin = request.headers.get('Origin') || '';
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response('Forbidden', { status: 403 });
    }

    // Rate limit by IP
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Rate limited — please try again later.' }),
        { status: 429, headers: { ...corsHeaders(request), 'Content-Type': 'application/json' } }
      );
    }

    // Input size guard — reject anything over 2KB to prevent prompt-stuffing
    const bodyText = await request.text();
    if (bodyText.length > 2048) {
      return new Response(
        JSON.stringify({ error: 'Request too large.' }),
        { status: 413, headers: { ...corsHeaders(request), 'Content-Type': 'application/json' } }
      );
    }

    try {
      const body = JSON.parse(bodyText);

      // Forward to Gemini
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      const data = await geminiRes.json();

      return new Response(JSON.stringify(data), {
        status: geminiRes.status,
        headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Proxy error.' }),
        { status: 500, headers: { ...corsHeaders(request), 'Content-Type': 'application/json' } }
      );
    }
  },
};
