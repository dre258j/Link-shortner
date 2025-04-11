export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    // Get the click count for the shortened URL
    const clickData = clickDatabase[id];

    if (clickData) {
      res.status(200).json({ clicks: clickData.count });
    } else {
      res.status(404).json({ message: "No data found for this link." });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
