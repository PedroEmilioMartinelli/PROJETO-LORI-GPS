export default function handler(req, res) {
  const historico = [
    { id: 1, trajeto: "Casa → Trabalho", data: "2025-10-06" },
    { id: 2, trajeto: "Trabalho → Academia", data: "2025-10-06" },
    { id: 3, trajeto: "Academia → Casa", data: "2025-10-05" }
  ];
  res.status(200).json(historico);
}
