import { useEffect, useState } from "react";
import styles from "../style/Common.module.css";

export default function Historico() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    fetch("/api/historico")
      .then(r => r.json())
      .then(data => setHistorico(data));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Histórico de Trajetos</h2>
      <ul className={styles.list}>
        {historico.map(h => (
          <li key={h.id} className={styles.item}>
            <div className={styles.itemTitle}>{h.trajeto}</div>
            <div className={styles.itemSubtitle}>{h.data}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
