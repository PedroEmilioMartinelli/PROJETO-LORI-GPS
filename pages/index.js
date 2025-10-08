import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../style/Auth.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Falha no login");
      localStorage.setItem("session", JSON.stringify({ token: data.token, user: data.user }));
      localStorage.setItem("usuario", data.user.email);
      router.push("/mapa");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.container}>
      <img src="https://i.imgur.com/HOX87tN.png"></img>
      <h1>Faça Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} required />
        <button type="submit" disabled={busy}>{busy ? "Entrando..." : "Entrar"}</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p onClick={() => router.push("/cadastro")} className={styles.link}>
        Criar conta
      </p>
    </div>
  );
}