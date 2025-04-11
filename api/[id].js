let urlDatabase = {};
let clickCount = {};

export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  const originalUrl = urlDatabase[id];

  if (originalUrl) {
    clickCount[id] = (clickCount[id] || 0) + 1;
    res.writeHead(302, { Location: originalUrl });
    res.end();
  } else {
    res.status(404).send("URL not found");
  }
}
