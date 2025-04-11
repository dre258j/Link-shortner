let urlDatabase = {};
let clickDatabase = {};

// Save and load from localStorage-like memory on Vercel (session only)
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;

    const shortId = custom || Date.now().toString(36);

    if (urlDatabase[shortId]) {
      return res.status(400).json({ error: "Custom alias already in use." });
    }

    urlDatabase[shortId] = url;
    clickDatabase[shortId] = clickDatabase[shortId] || 0;

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({ shortened_url: shortenedUrl, clicks: clickDatabase[shortId] });
  } else if (req.method === 'GET') {
    const { id } = req.query;
    const originalUrl = urlDatabase[id];

    if (originalUrl) {
      clickDatabase[id]++;
      res.writeHead(302, { Location: originalUrl });
      res.end();
    } else {
      res.status(404).send("URL not found");
    }
  } else {
    res.status(405).end();
  }
}
