let urlDatabase = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;
    const shortId = custom || Date.now().toString(36);

    if (urlDatabase[shortId]) {
      return res.status(400).json({ error: "Custom alias already exists" });
    }

    urlDatabase[shortId] = url;
    res.status(200).json({ shortened_url: `${req.headers.origin}/${shortId}` });
  } else {
    res.status(405).end();
  }
}
