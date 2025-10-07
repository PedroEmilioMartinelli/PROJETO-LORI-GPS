import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../style/Mapa.module.css";
import { Icon } from "leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

// small custom marker to avoid broken default icon in some builds
const markerIcon = new Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Mapa() {
  const [localizacoes, setLocalizacoes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/localizacao")
      .then(r => r.json())
      .then(data => setLocalizacoes(data));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.searchBar}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Para Onde?"
        />
        <button className={styles.editBtn}>✏️</button>
      </div>

      <div className={styles.filters}>
        <select>
          <option>Tipos de Rotas</option>
        </select>
        <select>
          <option>Selecionar Tipo de Veículo</option>
        </select>
      </div>

      <div className={styles.mapWrap}>
        <MapContainer center={[-23.55052, -46.633308]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {localizacoes.map(loc => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={markerIcon}>
              <Popup>
                {`Hora: ${loc.hora}`}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
