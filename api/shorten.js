let urlDatabase = {};
let counter = 1;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;
    const shortId = counter++;
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
