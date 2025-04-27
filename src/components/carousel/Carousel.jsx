import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';

const Carousel = () => {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/guides`)
      .then(res => setGuides(res.data))
      .catch(err => console.error("Error al cargar guías:", err));
  }, []);

  const closePopup = () => setSelectedGuide(null);

  return (
    <div className="carousel-container">
      <div className="carousel-intro">
        <h2>Nuestros Guías</h2>
        <p>
          Si buscas disfrutar al máximo tus rutas con seguridad, conocimiento y pasión por la naturaleza, te presentamos a nuestros guías. Profesionales que te acompañarán para que cada aventura sea única e inolvidable.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {guides.map((guide) => (
          <SwiperSlide key={guide._id}>
            <div className="card" onClick={() => setSelectedGuide(guide)}>
              <img src={guide.imagen} alt={guide.nombre} className="card-img" />
              <h4>{guide.nombre}</h4>
              <p>{guide.descripcion}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedGuide && (
        
          <div className="popup">
            <img src={selectedGuide.imagen} alt={selectedGuide.nombre}/>
            <h3>{selectedGuide.nombre}</h3>
            <p><strong>Descripción:</strong> {selectedGuide.descripcion}</p>
            <p><strong>Teléfono:</strong> {selectedGuide.telefono}</p>
            <p><strong>Instagram:</strong> {selectedGuide.instagram || 'No disponible'}</p>
            <p><strong>Email:</strong> {selectedGuide.correoElectronico}</p>
            <button className="close-btn" onClick={closePopup}>Cerrar</button>
          </div>
        
      )}
    </div>
  );
};

export default Carousel;

