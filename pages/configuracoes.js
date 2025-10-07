import { useEffect, useState } from "react";
import styles from "../style/Common.module.css";

export default function Configuracoes() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch("/api/configuracoes")
      .then(r => r.json())
      .then(data => setConfig(data));
  }, []);

  if (!config) return <div className={styles.container}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h2>Configurações</h2>
      <div className={styles.card}>
        <div className={styles.row}>
          <span>Atualização</span>
          <strong>{config.atualizarTempo} min</strong>
        </div>
        <div className={styles.row}>
          <span>Modo Economia de Bateria</span>
          <strong>{config.modoEconomiaBateria ? "Ativo" : "Desativado"}</strong>
        </div>
        <div className={styles.row}>
          <span>Notificações</span>
          <strong>{config.notificacoesAtivas ? "Ativas" : "Desativadas"}</strong>
        </div>
      </div>
    </div>
  );
}
