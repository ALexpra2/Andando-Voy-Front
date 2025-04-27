import { useEffect, useState } from 'react';
import axios from 'axios';
import RouteCard from '../../components/routecard/RouteCard';
import RouteStats from '../../components/routestats/RouteStats';
import useAuth from '../../hooks/useAuth';
import './Dashboard.css';

const initialRoute = {
  title: '',
  description: '',
  location: '',
  difficulty: '',
  duration: '',
  type: '',
  coords: '',
  images: '',
  completed: false,
  notes: ''
};

const Dashboard = () => {
  const user = useAuth();
  const [routes, setRoutes] = useState([]);
  const [stats, setStats] = useState(null);
  const [newRoute, setNewRoute] = useState(initialRoute);

  useEffect(() => {
    if (user) {
      fetchUserRoutes();
      fetchUserStats();
    }
  }, [user]);

  const fetchUserRoutes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/routes`, { withCredentials: true });
      setRoutes(res.data);
    } catch (error) {
      console.error('Error al obtener rutas:', error);
    }
  };

  const fetchUserStats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/routes/stats`, { withCredentials: true });
      setStats(res.data);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoute({
      ...newRoute,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...newRoute,
        coords: JSON.parse(newRoute.coords),
        images: [newRoute.images]
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/users/routes`, body, { withCredentials: true });
      setNewRoute(initialRoute);
      fetchUserRoutes();
      fetchUserStats();
    } catch (error) {
      console.error('Error al crear ruta:', error);
      alert('Error al crear ruta. Verifica los datos.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/routes/${id}`, { withCredentials: true });
      fetchUserRoutes();
      fetchUserStats();
    } catch (error) {
      console.error('Error al eliminar ruta:', error);
    }
  };

  return (
    <div className="dashboard">
      {stats && <RouteStats stats={stats} />}
      
      <h2 className="section-title">Crear nueva ruta</h2>

      <form className="route-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Título" value={newRoute.title} onChange={handleChange} required />
        <input name="description" placeholder="Descripción" value={newRoute.description} onChange={handleChange} required />
        <input name="location" placeholder="Ubicación" value={newRoute.location} onChange={handleChange} />

        <select name="difficulty" value={newRoute.difficulty} onChange={handleChange} required>
          <option value="">Selecciona dificultad</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <input type="number" name="duration" placeholder="Duración (h)" value={newRoute.duration} onChange={handleChange} required />

        <select name="type" value={newRoute.type} onChange={handleChange} required>
          <option value="">Selecciona tipo</option>
          <option value="circular">Circular</option>
          <option value="lineal">Lineal</option>
        </select>

        <textarea name="coords" placeholder='[{"lat": 37.056029, "lng": -3.365527}]' value={newRoute.coords} onChange={handleChange} required />

        <input name="images" placeholder="URL de imagen" value={newRoute.images} onChange={handleChange} />

        <input name="notes" placeholder="Notas" value={newRoute.notes} onChange={handleChange} />       

        <button className="btn-create" type="submit">Crear</button>
      </form>

      <h2 className="section-title">Mis rutas</h2>

      <div className="routes-container">
        {routes.map((route) => (
          <RouteCard
            key={route._id}
            route={route}
            userId={user.uid}     // Pasamos el userId autenticado
            onDelete={handleDelete} //Pasamos la función para eliminar
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
