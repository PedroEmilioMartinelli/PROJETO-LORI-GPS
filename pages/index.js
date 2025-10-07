"use client";
import { useRouter } from "next/router";
import styles from "../style/Auth.module.css";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/mapa");
  };

  return (
    <div className={styles.container}>
      <h1>Login GPS</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input type="text" placeholder="Usuário" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
      <p onClick={() => router.push("/cadastro")} className={styles.link}>
        Criar conta
      </p>
    </div>
  );
}
