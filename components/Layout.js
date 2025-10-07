import Link from "next/link";
import styles from "../style/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <main className={styles.content}>{children}</main>
      <nav className={styles.bottomNav}>
        <Link href="/mapa">🗺️</Link>
        <Link href="/historico">📅</Link>
        <Link href="/configuracoes">⚙️</Link>
        <Link href="/perfil">👤</Link>
      </nav>
    </div>
  );
}
