import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../style/Auth.module.css";

export default function Cadastro() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError(""); setBusy(true);
    try {
      const r = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Falha no cadastro");
      setOk(true);
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Criar Conta</h1>
      <form onSubmit={handleCadastro} className={styles.form}>
        <input type="text" placeholder="Nome" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit" disabled={busy}>{busy ? "Enviando..." : "Cadastrar"}</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {ok && <p className={styles.success}>Conta criada! Redirecionando...</p>}
    </div>
  );
}