import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapaLeaflet() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const map = L.map("map").setView([-29.38, -53.71], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const postos = [
      { nome: "Posto BR", lat: -29.382, lng: -53.712, tipo: "gas" },
      { nome: "Shell RS", lat: -29.381, lng: -53.714, tipo: "gas" },
      { nome: "EVC Center", lat: -29.379, lng: -53.710, tipo: "ev" },
    ];

    postos.forEach(p => {
      const iconHtml = p.tipo === "ev" ? "⚡" : "⛽";
      const marker = L.divIcon({ html: iconHtml, className: "marker" });
      L.marker([p.lat, p.lng], { icon: marker }).addTo(map).bindPopup(p.nome);
    });

    let origem = null;
    let destino = null;

    map.on("click", e => {
      if (!origem) {
        origem = e.latlng;
        L.marker(origem).addTo(map).bindPopup("Origem").openPopup();
      } else if (!destino) {
        destino = e.latlng;
        L.marker(destino).addTo(map).bindPopup("Destino").openPopup();
        L.polyline([origem, destino], { color: "blue" }).addTo(map);

        const rotas = JSON.parse(localStorage.getItem("rotas") || "[]");
        rotas.push({ origem, destino, data: new Date().toLocaleString() });
        localStorage.setItem("rotas", JSON.stringify(rotas));
        origem = null;
        destino = null;
      }
    });
  }, []);

  return <div id="map" style={{ height: "80vh", width: "100%" }}></div>;
}
