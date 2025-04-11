let urlDatabase = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortId = custom || Date.now().toString(36);

    // Check if custom alias already exists
    if (urlDatabase[shortId]) {
      return res.status(409).json({ error: "Custom alias already in use" });
    }

    urlDatabase[shortId] = url;

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({ shortened_url: shortenedUrl });
  } else if (req.method === 'GET') {
    const { id } = req.query;
    const originalUrl = urlDatabase[id];
    if (originalUrl) {
      res.writeHead(302, { Location: originalUrl });
      res.end();
    } else {
      res.status(404).send("URL not found");
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
