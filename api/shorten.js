let urlDatabase = {};
let clickCount = {};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { url, custom } = req.body;
    let shortId;

    if (custom) {
      if (urlDatabase[custom]) {
        return res.status(400).json({ error: "Custom alias already taken" });
      }
      shortId = custom;
    } else {
      shortId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
      while (urlDatabase[shortId]) {
        shortId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
      }
    }

    urlDatabase[shortId] = url;
    clickCount[shortId] = 0;

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({ shortened_url: shortenedUrl, id: shortId });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
