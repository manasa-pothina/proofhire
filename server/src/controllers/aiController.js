// Node 18+ has global fetch available, no extra package needed.

// @route POST /api/ai/generate  (protected)
// body: { prompt: string }
async function generate(req, res, next) {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'prompt is required in the request body' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    if (!apiKey) {
      return res.status(500).json({ message: 'GEMINI_API_KEY is not set on the server' });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Gemini returned an error (e.g. quota, bad key, invalid model)
      return res.status(response.status).json({ message: 'Gemini API error', details: data });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    res.json({ text, raw: data });
  } catch (err) {
    next(err);
  }
}

module.exports = { generate };
