import urlDatabase from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;
    const id = custom?.trim() || Date.now().toString(36);

    if (urlDatabase[id]) {
      return res.status(400).json({ error: 'Alias already in use' });
    }

    urlDatabase[id] = { originalUrl: url, clicks: 0 };

    const shortenedUrl = `${req.headers.origin}/${id}`;
    res.status(200).json({ shortened_url: shortenedUrl, clicks: 0 });
  } else {
    res.status(405).end();
  }
}
