import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useState } from "react";

let iconDefault = new L.Icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconUrl,
  // iconShadow: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: iconShadowUrl,
  shadowSize: [41, 41]
});

const Mapa = () => {
  const [iconUbicacion] = useState(iconDefault);

  return (
    <div className="mapa-container">
      <MapContainer
        center={[8.94332237767944, -75.44453200000407]}
        zoom={12}
        scrollWheelZoom={false}
        className="mapa"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[8.94332237767944, -75.44453200000407]}
          icon={iconUbicacion}
        >
          <Popup>
            Llave Para Las Naciones <br />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapa;
