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
  coords: [],
  images: [],
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
      axios.get(`${import.meta.env.VITE_API_URL}/api/users/routes`, { withCredentials: true })
        .then(res => setRoutes(res.data));

      axios.get(`${import.meta.env.VITE_API_URL}/api/users/routes/stats`, { withCredentials: true })
        .then(res => setStats(res.data));
    }
  }, [user]);


  const handleChange = (e) => {
    const name = e.target.name;
    let value;
  
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
  
    setNewRoute({ ...newRoute, [name]: value });
  };

  const handleCreateRoute = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newRoute.title);
      formData.append('description', newRoute.description);
      formData.append('location', newRoute.location);
      formData.append('difficulty', newRoute.difficulty);
      formData.append('duration', newRoute.duration);
      formData.append('type', newRoute.type);
      formData.append('notes', newRoute.notes);
      formData.append('completed', newRoute.completed);
      if (newRoute.latitude) {
        formData.append('coords', newRoute.latitude); // Considera enviar latitud y longitud juntos como un array o objeto
      }
      if (newRoute.longitude) {
        formData.append('coords', newRoute.longitude); // Revisa cómo esperas recibir las coordenadas en el backend
      }
      if (newRoute.image) {
        formData.append('image', newRoute.image); // 'image' debe coincidir con el nombre del campo que espera multer en el backend
      }
  
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/routes`,
        formData, // ¡Envia FormData en lugar de newRoute!
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', // ¡Importante para enviar archivos!
          },
        }
      );
      setRoutes([...routes, res.data.route]);
      setNewRoute(initialRoute);
    } catch (error) {
      console.error('Error al crear ruta:', error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/routes/${id}`, { withCredentials: true });
      setRoutes(routes.filter(route => route._id !== id));
    } catch (error) {
      console.error('Error al eliminar ruta:', error);
    }
  };



  return (
    <div className="dashboard">
      {stats && <RouteStats stats={stats} />}
  
      <h2 className="section-title">Crear nueva ruta</h2>
      <form className="route-form" onSubmit={handleCreateRoute} encType="multipart/form-data">
        <input name="title" placeholder="Título" value={newRoute.title} onChange={handleChange} required />
        <input name="description" placeholder="Descripción" value={newRoute.description} onChange={handleChange} required />
        <input name="location" placeholder="Ubicación" value={newRoute.location} onChange={handleChange} />
  
        <select name="difficulty" value={newRoute.difficulty} onChange={handleChange} required>
          <option value="">Selecciona dificultad</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
  
        <input name="duration" type="number" placeholder="Duración (h)" value={newRoute.duration} onChange={handleChange} required />
  
        <select name="type" value={newRoute.type} onChange={handleChange} required>
          <option value="">Selecciona tipo</option>
          <option value="circular">Circular</option>
          <option value="lineal">Lineal</option>
        </select>
  
        <input name="notes" placeholder="Notas" value={newRoute.notes} onChange={handleChange} />
  
        <input 
          type="file" 
          name="image" 
          accept="image/*" 
          onChange={(e) => setNewRoute({ ...newRoute, image: e.target.files[0] })} 
        />
  

  
        <label className="checkbox">
          <input type="checkbox" name="completed" checked={newRoute.completed} onChange={handleChange} />
          Ruta completada
        </label>
  
        <button className="btn-create" type="submit">Crear</button>
      </form>
  
      <h2 className="section-title">Mis rutas</h2>
      <div className="routes-container">
        {routes.map(route => (
          <RouteCard key={route._id} route={route} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}  

export default Dashboard;
