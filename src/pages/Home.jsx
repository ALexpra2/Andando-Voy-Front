import Header from '../components/header/Header';
import MapView from '../components/MapView';
import RouteCard from '../components/routecard/RouteCard';
import Carousel from '../components/carousel/Carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/routes`)
      .then(res => setRoutes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Header />
      <div className="map-container">
        <MapView routes={routes} />
      </div>
      <div id="rutas" className="routes-container">
        {routes.map(route => (
          <RouteCard key={route._id} route={route} />
        ))}
        <Carousel />
      </div>
    </>
  );
};

export default Home;