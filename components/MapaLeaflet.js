import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

const NOMINATIM = "/api/nominatim";
const OSRM = "https://router.project-osrm.org/route/v1/driving";

function msToMin(ms){ return Math.round(ms/60); }
function mToKm(m){ return (m/1000).toFixed(1); }

async function geocodeSuggest(q) {
  const url = `${NOMINATIM}?q=${encodeURIComponent(q)}`;
  const r = await fetch(url);
  const data = await r.json();
  return data.map(x => ({
    name: x.display_name,
    lat: parseFloat(x.lat),
    lon: parseFloat(x.lon),
    city: x.address.city || x.address.town || x.address.village || x.address.county || "",
    state: x.address.state || x.address.region || "",
  }));
}

async function reverseCityState(lat, lon) {
  const url = `${NOMINATIM}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
  const r = await fetch(url, { headers: { "Accept-Language": "pt-BR" } });
  const j = await r.json();
  const a = j.address || {};
  const city = a.city || a.town || a.village || a.county || "";
  const state = a.state || a.region || "";
  return `${city}${state ? " - " + state : ""}`;
}

export default function MapaLeaflet() {
  const mapRef = useRef(null);
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [oSug, setOSug] = useState([]);
  const [dSug, setDSug] = useState([]);
  const [waypoints, setWaypoints] = useState([{ value:"", sug:[] }]);
  const [poisOn, setPoisOn] = useState({ gas: true, hotel: false });
  const layerRef = useRef({ route: null, markers: [] });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapRef.current) return;

    const map = L.map("map", { zoomControl: false }).setView([-15.78, -47.93], 5);
    mapRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Try Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.setView([latitude, longitude], 12);
          L.marker([latitude, longitude]).addTo(map).bindPopup("Você está aqui");
        }, () => {}, { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  function selectSuggestion(type, s) {
    if (type === "o") { setOrigem(`${s.city || s.name}${s.state ? " - "+s.state: ""}`); setOSug([]); origemRef.current = s; }
    if (type === "d") { setDestino(`${s.city || s.name}${s.state ? " - "+s.state: ""}`); setDSug([]); destinoRef.current = s; }
  }

  const origemRef = useRef(null);
  const destinoRef = useRef(null);
  const wpRefs = useRef([]);

  async function onChangeField(type, value, idx=null) {
    if (type==="o"){ setOrigem(value); setOSug(value.length>2 ? await geocodeSuggest(value) : []); }
    if (type==="d"){ setDestino(value); setDSug(value.length>2 ? await geocodeSuggest(value) : []); }
    if (type==="w"){
      const list = [...waypoints];
      list[idx].value = value;
      list[idx].sug = value.length>2 ? await geocodeSuggest(value) : [];
      setWaypoints(list);
    }
  }

  function chooseWp(idx, s){
    const list = [...waypoints];
    list[idx].value = `${s.city || s.name}${s.state ? " - "+s.state: ""}`;
    list[idx].sug = [];
    setWaypoints(list);
    wpRefs.current[idx] = s;
  }

  async function traceRoute() {
    const map = mapRef.current;
    if (!map) return;

    const points = [];
    const markers = layerRef.current.markers;
    markers.forEach(m => m.remove());
    layerRef.current.markers = [];
    if (layerRef.current.route) { map.removeLayer(layerRef.current.route); layerRef.current.route = null; }

    const makePoint = async (ref, text) => {
      if (ref) return [ref.lon, ref.lat, ref];
      const [sug] = await geocodeSuggest(text);
      return [sug.lon, sug.lat, sug];
    };

    if (!origem && !destino) return;
    const [oLon, oLat, oObj] = await makePoint(origemRef.current, origem);
    const wp = [];
    for (let i=0;i<wpRefs.current.length;i++){
      const ref = wpRefs.current[i];
      const val = waypoints[i]?.value;
      if (val && val.trim()){
        const [wLon, wLat, wObj] = await makePoint(ref, val);
        wp.push([wLon, wLat, wObj]);
      }
    }
    const [dLon, dLat, dObj] = await makePoint(destinoRef.current, destino);

    const all = [[oLon,oLat,oObj], ...wp, [dLon,dLat,dObj]];
    all.forEach(([lon,lat,obj], idx) => {
      const m = L.marker([lat, lon]).addTo(map).bindPopup((obj.city || obj.name) + (obj.state ? " - " + obj.state : ""));
      layerRef.current.markers.push(m);
    });

    const coordsStr = all.map(([lon,lat]) => `${lon},${lat}`).join(";");
    const r = await fetch(`${OSRM}/${coordsStr}?overview=full&geometries=geojson`);
    const json = await r.json();
    if (json.routes && json.routes[0]) {
      const route = json.routes[0];
      const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
      const line = L.polyline(coords, { weight: 5 }).addTo(map);
      layerRef.current.route = line;
      map.fitBounds(line.getBounds());

      // Dispatch header stats
      const detail = { distKm: mToKm(route.distance), durMin: msToMin(route.duration) };
      window.dispatchEvent(new CustomEvent("route-stats", { detail }));

      // Save history
      const rotas = JSON.parse(localStorage.getItem("rotas") || "[]");
      rotas.push({
        origem: { nome: `${oObj.city || oObj.name}${oObj.state ? " - "+oObj.state : ""}` },
        destino: { nome: `${dObj.city || dObj.name}${dObj.state ? " - "+dObj.state : ""}` },
        waypoints: wp.map(([_, __, obj]) => ({ nome: `${obj.city || obj.name}${obj.state ? " - "+obj.state : ""}` })),
        distanceKm: mToKm(route.distance),
        durationMin: msToMin(route.duration),
        data: new Date().toLocaleString()
      });
      localStorage.setItem("rotas", JSON.stringify(rotas));
    }
  }

  return (
    <div>
      <div className="mapControls">
        <div className="field">
          <input placeholder="Origem (cidade, endereço...)" value={origem} onChange={e=>onChangeField("o", e.target.value)} />
          {oSug.length>0 && <ul className="sug">{oSug.map((s,i)=>(<li key={i} onClick={()=>selectSuggestion("o", s)}>{(s.city || s.name)} {s.state?`- ${s.state}`:""}</li>))}</ul>}
        </div>
        <div className="field">
          <input placeholder="Destino (cidade, endereço...)" value={destino} onChange={e=>onChangeField("d", e.target.value)} />
          {dSug.length>0 && <ul className="sug">{dSug.map((s,i)=>(<li key={i} onClick={()=>selectSuggestion("d", s)}>{(s.city || s.name)} {s.state?`- ${s.state}`:""}</li>))}</ul>}
        </div>

        {waypoints.map((w, idx)=>(
          <div className="field" key={idx}>
            <input placeholder={`Parada ${idx+1}`} value={w.value} onChange={e=>onChangeField("w", e.target.value, idx)} />
            {w.sug.length>0 && <ul className="sug">{w.sug.map((s,i)=>(<li key={i} onClick={()=>chooseWp(idx, s)}>{(s.city || s.name)} {s.state?`- ${s.state}`:""}</li>))}</ul>}
          </div>
        ))}

        <button onClick={()=>setWaypoints(w=>[...w, { value:"", sug:[] }])}>+ Parada</button>
        <button onClick={traceRoute}>Traçar rota</button>
      </div>
      <div id="map" style={{ height: "75vh", width: "100%" }}></div>

      <style jsx>{`
        .field{position:relative}
        .sug{position:absolute;z-index:1000;list-style:none;margin:0;padding:6px;border:1px solid var(--line);background:var(--surface);border-radius:8px;max-height:220px;overflow:auto;min-width:260px}
        .sug li{padding:6px 8px;cursor:pointer}
        .sug li:hover{background:rgba(125,125,255,.08)}
      `}</style>
    </div>
  );
}