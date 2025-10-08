import { useEffect, useState } from "react";
import styles from "../style/Common.module.css";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rotas, setRotas] = useState([]);
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session") || "null");
    if (!session) { window.location.href = "/"; return; }
    setUser(session.user);
    fetch(`/api/profile?userId=${encodeURIComponent(session.user.id)}`)
      .then(r => r.json())
      .then(d => { setNome(d.nome || ""); setTelefone(d.telefone || ""); });

    const r = JSON.parse(localStorage.getItem("rotas") || "[]");
    setRotas(r);
  }, []);

  const salvar = async () => {
    if (!user) return;
    await fetch(`/api/profile?userId=${encodeURIComponent(user.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, telefone })
    });
    setSaved(true);
    setTimeout(()=>setSaved(false), 1500);
  };

  return (
    <div className={styles.container}>
      <h2>Perfil</h2>
      <div className={styles.card}>
        <div className={styles.row}><span>Nome</span><input value={nome} onChange={e => setNome(e.target.value)} /></div>
        <div className={styles.row}><span>Telefone</span><input value={telefone} onChange={e => setTelefone(e.target.value)} /></div>
        <button onClick={salvar}>Salvar</button>
        {saved && <span className={styles.ok}>Salvo!</span>}
      </div>

      <h2>Histórico de Rotas</h2>
      <ul className={styles.list}>
        {rotas.map((r, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.itemTitle}>
              {r.origem?.nome} → {r.destino?.nome}
            </div>
            <div className={styles.itemSubtitle}>{r.data}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}