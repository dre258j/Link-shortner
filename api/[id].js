let urlDatabase = {};

export default function handler(req, res) {
  const { id } = req.query;
  const originalUrl = urlDatabase[id];

  if (originalUrl) {
    res.writeHead(302, { Location: originalUrl });
    res.end();
  } else {
    res.status(404).send("URL not found");
  }
}
