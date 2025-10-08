export default async function handler(req, res) {
  const { q } = req.query;
  const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(q)}`, {
    headers: { "Accept-Language": "pt-BR", "User-Agent": "LORI-GPS/1.0" }
  });
  const data = await r.json();
  res.status(200).json(data);
}
