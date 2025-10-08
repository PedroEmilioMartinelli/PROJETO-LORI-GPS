import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../style/Layout.module.css";

export default function Layout({ children }) {
  const [position, setPosition] = useState("bottom");
  const [stats, setStats] = useState(null); // {distKm, durMin}

  useEffect(() => {
    const pos = localStorage.getItem("navPos") || "bottom";
    setPosition(pos);

    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);

    const listener = (e) => setStats(e.detail);
    window.addEventListener("route-stats", listener);
    return () => window.removeEventListener("route-stats", listener);
  }, []);

  const logout = () => {
    localStorage.removeItem("session");
    window.location.href = "/";
  };

  const toggleTheme = () => {
    const current = document.body.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Link href="/mapa">NavGO</Link>
        </div>
        <div className={styles.stats}>
          {stats ? <span>{stats.distKm} km • {stats.durMin} min</span> : <span>—</span>}
        </div>
        <div className={styles.actions}>
          <button className={styles.ghost} onClick={toggleTheme}>Tema</button>
          <button className={styles.ghost} onClick={logout}>Sair</button>
        </div>
      </header>

      {position === "top" && (
        <nav className={`${styles.nav} ${styles.top}`}>
          <Link href="/mapa">🗺️</Link>
          <Link href="/historico">📅</Link>
          <Link href="/configuracoes">⚙️</Link>
          <Link href="/perfil">👤</Link>
        </nav>
      )}

      <main className={styles.content}>{children}</main>

      {position === "bottom" && (
        <nav className={`${styles.nav} ${styles.bottom}`}>
          <Link href="/mapa">🗺️</Link>
          <Link href="/historico">📅</Link>
          <Link href="/configuracoes">⚙️</Link>
          <Link href="/perfil">👤</Link>
        </nav>
      )}
    </div>
  );
}