// pages/api/shorten.js

let urlDatabase = {}; // শর্ট আইডি অনুযায়ী মূল ইউআরএল সংরক্ষণ
let clickDatabase = {}; // শর্ট আইডি অনুযায়ী ক্লিক কাউন্ট সংরক্ষণ

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;
    const shortId = custom || Date.now().toString(36);

    if (urlDatabase[shortId]) {
      return res.status(409).json({ error: 'এই কাস্টম আইডি ইতিমধ্যে ব্যবহৃত হয়েছে।' });
    }

    urlDatabase[shortId] = url;
    clickDatabase[shortId] = 0;

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({ shortened_url: shortenedUrl, shortId });
  } else if (req.method === 'GET') {
    const { id } = req.query;
    const originalUrl = urlDatabase[id];

    if (originalUrl) {
      clickDatabase[id] += 1;
      res.writeHead(302, { Location: originalUrl });
      res.end();
    } else {
      res.status(404).send("URL পাওয়া যায়নি");
    }
  } else {
    res.status(405).end(); // অনুমোদিত নয়
  }
}
