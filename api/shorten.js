let urlDatabase = {}; // Store URLs
let clickDatabase = {}; // Track clicks

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;
    const shortId = custom || Date.now().toString(36);

    urlDatabase[shortId] = url;
    clickDatabase[shortId] = clickDatabase[shortId] || 0;

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({
      shortened_url: shortenedUrl,
      shortId,
      clicks: clickDatabase[shortId]
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
