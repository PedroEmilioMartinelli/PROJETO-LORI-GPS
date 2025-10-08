import { useEffect, useState } from "react";
import styles from "../style/Common.module.css";

export default function Configuracoes() {
  const [config, setConfig] = useState(null);
  const [navPos, setNavPos] = useState("bottom");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    fetch("/api/configuracoes").then(r => r.json()).then(setConfig);
    setNavPos(localStorage.getItem("navPos") || "bottom");
    setTheme(localStorage.getItem("theme") || "dark");
  }, []);

  if (!config) return <div className={styles.container}>Carregando...</div>;

  const changeTheme = (t) => {
    setTheme(t);
    document.body.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };

  return (
    <div className={styles.container}>
      <h2>Configurações</h2>
      <div className={styles.card}>
        <div className={styles.row}><span>Atualizar em</span><strong>{config.atualizarTempo} min</strong></div>
        <div className={styles.row}><span>Economia de Bateria</span><strong>{config.modoEconomiaBateria ? "Ativo" : "Desativado"}</strong></div>
        <div className={styles.row}><span>Notificações</span><strong>{config.notificacoesAtivas ? "Ativas" : "Desativadas"}</strong></div>
      </div>

      <h3>Layout</h3>
      <div className={styles.card}>
        <div className={styles.row}>
          <span>Posição do menu</span>
          <select value={navPos} onChange={(e) => { setNavPos(e.target.value); localStorage.setItem("navPos", e.target.value); location.reload(); }}>
            <option value="top">Topo</option>
            <option value="bottom">Rodapé</option>
          </select>
        </div>
        <div className={styles.row}>
          <span>Tema</span>
          <select value={theme} onChange={(e) => changeTheme(e.target.value)}>
            <option value="dark">Escuro</option>
            <option value="light">Claro</option>
          </select>
        </div>
      </div>
    </div>
  );
}