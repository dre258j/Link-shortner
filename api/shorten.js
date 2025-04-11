let urlDatabase = {}; // Store original URL
let clickDatabase = {}; // Store click count for each short URL

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;

    // Check for custom alias, else generate one automatically
    let shortId = custom || Date.now().toString(36);

    // Store URL and initialize click count
    urlDatabase[shortId] = url;
    clickDatabase[shortId] = { count: 0 };

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({ shortened_url: shortenedUrl });
  } else if (req.method === 'GET') {
    const { id } = req.query;
    const originalUrl = urlDatabase[id];

    if (originalUrl) {
      // Increment click count on each visit
      clickDatabase[id].count++;

      res.writeHead(302, { Location: originalUrl });
      res.end();
    } else {
      res.status(404).send("URL not found");
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
