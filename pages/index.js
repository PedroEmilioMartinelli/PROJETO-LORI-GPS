import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../style/Auth.module.css";

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = e => {
    e.preventDefault();
    if (usuario.trim() && senha.trim()) {
      localStorage.setItem("usuario", usuario);
      router.push("/mapa");
    } else {
      alert("Preencha usuário e senha!");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login GPS</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input type="text" placeholder="Usuário" onChange={e => setUsuario(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      <p onClick={() => router.push("/cadastro")} className={styles.link}>
        Criar conta
      </p>
    </div>
  );
}
