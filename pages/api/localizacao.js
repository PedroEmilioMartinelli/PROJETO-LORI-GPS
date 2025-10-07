export default function handler(req, res) {
  const localizacoes = [
    { id: 1, lat: -23.55052, lng: -46.633308, hora: "08:00" },
    { id: 2, lat: -23.5511, lng: -46.6342, hora: "08:10" },
    { id: 3, lat: -23.5525, lng: -46.6358, hora: "08:20" }
  ];
  res.status(200).json(localizacoes);
}
