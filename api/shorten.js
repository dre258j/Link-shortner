// urlDatabase er modhe URL gulo store hoy.
let urlDatabase = {}; 
let clickDatabase = {}; // Click count track korar jonno

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;

    let shortId = custom || Date.now().toString(36); // Jodi custom alias na thake, tahole timestamp use hobe

    // URL & click tracking gulo store kora hocche
    urlDatabase[shortId] = url;
    clickDatabase[shortId] = { count: 0 }; // Initialize click count

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({ shortened_url: shortenedUrl });
  } else if (req.method === 'GET') {
    const { id } = req.query;

    const originalUrl = urlDatabase[id];
    if (originalUrl) {
      clickDatabase[id].count++; // Increment click count on each visit

      res.writeHead(302, { Location: originalUrl });
      res.end();
    } else {
      res.status(404).send("URL not found");
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
