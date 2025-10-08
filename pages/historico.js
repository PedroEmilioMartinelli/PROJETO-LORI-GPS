import { useEffect, useState } from "react";
import styles from "../style/Common.module.css";

export default function Historico() {
  const [rotas, setRotas] = useState([]);
  useEffect(() => {
    const r = JSON.parse(localStorage.getItem("rotas") || "[]");
    setRotas(r.reverse());
  }, []);

  return (
    <div className={styles.container}>
      <h2>Histórico de Rotas</h2>
      <ul className={styles.list}>
        {rotas.map((r, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.itemTitle}>
              {r.origem.nome} → {r.destino.nome}
              {r.waypoints?.length ? ` (via ${r.waypoints.map(w=>w.nome).join(" • ")})` : ""}
            </div>
            <div className={styles.itemSubtitle}>
              {r.data} — {r.distanceKm} km, {r.durationMin} min
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}