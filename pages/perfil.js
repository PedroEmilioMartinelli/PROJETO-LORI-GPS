import styles from "../style/Common.module.css";

export default function Perfil() {
  // mock profile
  const user = {
    nome: "Usuário Teste",
    email: "teste@exemplo.com",
    celular: "+55 11 9XXXX-XXXX"
  };

  return (
    <div className={styles.container}>
      <h2>Perfil</h2>
      <div className={styles.card}>
        <div className={styles.row}><span>Nome</span><strong>{user.nome}</strong></div>
        <div className={styles.row}><span>E-mail</span><strong>{user.email}</strong></div>
        <div className={styles.row}><span>Celular</span><strong>{user.celular}</strong></div>
      </div>
    </div>
  );
}
