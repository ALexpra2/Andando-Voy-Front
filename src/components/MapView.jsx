import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ routes }) => (
  <MapContainer center={[40, -3]} zoom={6} style={{ height: '600px', width: '80%',borderRadius: '20px' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {routes.map(route => (
      route.coords.length > 0 && (
        <Marker key={route._id} position={[route.coords[0].lat, route.coords[0].lng]}>
          <Popup>
          <div style={{ maxWidth: '250px' }}>
              <h3>{route.title}</h3>
              <p><strong>Descripción:</strong> {route.description}</p>
              <p><strong>Localización:</strong> {route.location}</p>
              <p><strong>Dificultad:</strong> {route.difficulty}</p>
              <p><strong>Duración:</strong> {route.duration} horas</p>
              <p><strong>Tipo:</strong> {route.type}</p>
            </div>
          </Popup>
        </Marker>
      )
    ))}
  </MapContainer>
);

export default MapView;