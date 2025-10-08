import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapaLeaflet = dynamic(() => import("../components/MapaLeaflet.js"), { ssr: false });

export default function Mapa() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (!user) window.location.href = "/";
    else setToken("ok");
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Mapa</h1>
      <p>Clique para marcar origem e destino. Postos ⛽ e elétricos ⚡ serão exibidos.</p>
      <MapaLeaflet />
    </div>
  );
}
