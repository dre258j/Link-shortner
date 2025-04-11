// This should NOT timeout, simple logic
let urlDatabase = {};
let clickDatabase = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;
    const shortId = custom || Date.now().toString(36);

    if (urlDatabase[shortId]) {
      return res.status(400).json({ error: "Custom alias already taken." });
    }

    urlDatabase[shortId] = url;
    clickDatabase[shortId] = 0;

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    return res.status(200).json({ shortened_url: shortenedUrl, clicks: 0 });
  }

  res.status(405).end(); // Method not allowed
}
