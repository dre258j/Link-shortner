let urlDatabase = {};
let clickDatabase = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;
    const shortId = custom || Date.now().toString(36);

    if (urlDatabase[shortId]) {
      return res.status(400).json({ error: 'Alias already exists' });
    }

    urlDatabase[shortId] = url;
    clickDatabase[shortId] = 0;

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({ shortened_url: shortenedUrl });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

export { urlDatabase, clickDatabase };
