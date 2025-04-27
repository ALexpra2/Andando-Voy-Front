import { useState } from 'react';
import './RouteCard.css';

const RouteCard = ({ route, userId, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro que quieres eliminar esta ruta?')) {
      onDelete(route._id);
      setShowPopup(false);
    }
  };

  const isOwner = route.user === userId; // 🔥 Comprobar si la ruta es del usuario

  return (
    <>
      <div className="route-card" onClick={handleClick}>
        <img src={route.images[0]} alt={route.title} />
        <h3>{route.title}</h3>
        <p>{route.description}</p>
        <p><strong>Localización:</strong> {route.location}</p>
      </div>

      {showPopup && (
        <div className="popup">
          <h2>{route.title}</h2>
          <img src={route.images[0]} alt={route.title} />
          <p><strong>Descripción:</strong> {route.description}</p>
          <p><strong>Localización:</strong> {route.location}</p>
          <p><strong>Dificultad:</strong> {route.difficulty}</p>
          <p><strong>Duración:</strong> {route.duration} horas</p>
          <p><strong>Tipo:</strong> {route.type}</p>
          <p><strong>Notas:</strong> {route.notes || 'Sin notas'}</p>

          <button className="close-btn" onClick={handleClose}>Cerrar</button>

          {isOwner && (
            <button className="btn-delete" onClick={handleDelete}>
              Eliminar ruta
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default RouteCard;
