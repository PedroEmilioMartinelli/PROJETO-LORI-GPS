import dynamic from "next/dynamic";
import { useEffect } from "react";

const MapaLeaflet = dynamic(() => import("../components/MapaLeaflet.js"), { ssr: false });

export default function Mapa() {
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) window.location.href = "/";
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <MapaLeaflet />
    </div>
  );
}