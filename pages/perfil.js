import { useEffect, useState } from "react";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rotas, setRotas] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (!user) window.location.href = "/";
    const dados = JSON.parse(localStorage.getItem("perfil") || "{}");
    setNome(dados.nome || "");
    setTelefone(dados.telefone || "");
    const r = JSON.parse(localStorage.getItem("rotas") || "[]");
    setRotas(r);
  }, []);

  const salvar = () => {
    localStorage.setItem("perfil", JSON.stringify({ nome, telefone }));
    alert("Perfil salvo!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Perfil</h1>
      <p>Usuário: {localStorage.getItem("usuario")}</p>
      <label>Nome:</label>
      <input value={nome} onChange={e => setNome(e.target.value)} />
      <label>Telefone:</label>
      <input value={telefone} onChange={e => setTelefone(e.target.value)} />
      <button onClick={salvar}>Salvar</button>

      <h2>Histórico de Rotas</h2>
      <ul>
        {rotas.map((r, i) => (
          <li key={i}>
            {r.data} - Origem ({r.origem.lat.toFixed(3)}, {r.origem.lng.toFixed(3)}) → Destino ({r.destino.lat.toFixed(3)}, {r.destino.lng.toFixed(3)})
          </li>
        ))}
      </ul>
    </div>
  );
}
