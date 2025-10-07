import { useRouter } from "next/router";
import styles from "../style/Auth.module.css";

export default function Cadastro() {
  const router = useRouter();

  const handleCadastro = (e) => {
    e.preventDefault();
    router.push("/mapa");
  };

  return (
    <div className={styles.container}>
      <h1>Criar Conta</h1>
      <form onSubmit={handleCadastro} className={styles.form}>
        <input type="text" placeholder="Nome" required />
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
