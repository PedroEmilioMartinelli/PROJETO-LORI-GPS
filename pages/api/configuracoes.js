export default function handler(req, res) {
  const config = {
    atualizarTempo: 5,
    modoEconomiaBateria: true,
    notificacoesAtivas: true
  };
  res.status(200).json(config);
}
