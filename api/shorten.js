let urlDatabase = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    let shortId = custom || Date.now().toString(36);

    // Check if custom alias is already taken
    if (urlDatabase[shortId]) {
      return res.status(400).json({ error: "Alias already in use" });
    }

    urlDatabase[shortId] = url;

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({ shortened_url: shortenedUrl });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
