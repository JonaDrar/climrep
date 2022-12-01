import db from '../../db.json';

export default function handler(req, res) {
  const { id, q } = req.query;

  // we have an id available
  if (id) {
    const item = db.find((item) => item.id === +id);
    return res.status(200).json(item);
  }

  // we have a keyword to search for
  if (q) {
    const results = db.filter((sparePart) => {
      const { title } = sparePart;
      return title.toLowerCase().includes(q.toLowerCase());
    });
    return res.status(200).json(results);
  }

  // we don't have anything to search for
    return res.status(400).json({ message: "No id or query provided" });
}
