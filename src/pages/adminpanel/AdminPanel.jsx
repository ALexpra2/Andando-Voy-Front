import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const API = import.meta.env.VITE_API_URL;

export default function AdminPanel() {
  const [isLogged, setIsLogged] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const [blogPosts, setBlogPosts] = useState([]);
  const [blogForm, setBlogForm] = useState({ title: '', content: '', image: '', id: null });

  const [marketItems, setMarketItems] = useState([]);
  const [marketForm, setMarketForm] = useState({ title: '', description: '', price: '', imageUrl: '', id: null });

  const [guideProfiles, setGuideProfiles] = useState([]);
  const [guideForm, setGuideForm] = useState({ nombre: '', telefono: '', CorreoElectronico: '', descripcion: '', imagen: '', id: null });

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/loginjwt`, loginForm, { withCredentials: true });
      setIsLogged(true);
      loadData();
    } catch {
      alert('Login incorrecto');
    }
  };

  const logout = async () => {
    await axios.post(`${API}/api/auth/logoutjwt`, {}, { withCredentials: true });
    setIsLogged(false);
    window.location.href = '/loginjwt'; //para que por defecto no me reenvie a /login
  };
  
  const loadData = async () => {
    try {
      const blogResponse = await axios.get(`${API}/api/blog`, { withCredentials: true });
      const marketResponse = await axios.get(`${API}/api/marketplace`, { withCredentials: true });
      const guideResponse = await axios.get(`${API}/api/guides`, { withCredentials: true });
      setBlogPosts(blogResponse.data);
      setMarketItems(marketResponse.data);
      setGuideProfiles(guideResponse.data);
    } catch {
      alert('Error al cargar datos');
    }
  };

  const saveBlogPost = async (e) => {
    e.preventDefault();
    if (blogForm.id !== null) {
      await axios.put(`${API}/api/blog/${blogForm.id}`, blogForm, { withCredentials: true });
    } else {
      await axios.post(`${API}/api/blog`, blogForm, { withCredentials: true });
    }
    setBlogForm({ title: '', content: '', image: '', id: null });
    loadData();
  };

  const deleteBlogPost = async (id) => {
    if (confirm('¿Eliminar este blog?')) {
      await axios.delete(`${API}/api/blog/${id}`, { withCredentials: true });
      loadData();
    }
  };

  const saveMarketItem = async (e) => {
    e.preventDefault();
    const data = { ...marketForm, price: parseFloat(marketForm.price) };
    if (marketForm.id !== null) {
      await axios.put(`${API}/api/marketplace/${marketForm.id}`, data, { withCredentials: true });
    } else {
      await axios.post(`${API}/api/marketplace`, data, { withCredentials: true });
    }
    setMarketForm({ title: '', description: '', price: '', imageUrl: '', id: null });
    loadData();
  };

  const deleteMarketItem = async (id) => {
    if (confirm('¿Eliminar este anuncio?')) {
      await axios.delete(`${API}/api/marketplace/${id}`, { withCredentials: true });
      loadData();
    }
  };

  const saveGuideProfile = async (e) => {
    e.preventDefault();
    if (guideForm.id !== null) {
      await axios.put(`${API}/api/guides/${guideForm.id}`, guideForm, { withCredentials: true });
    } else {
      await axios.post(`${API}/api/guides`, guideForm, { withCredentials: true });
    }
    setGuideForm({ nombre: '', telefono: '', CorreoElectronico: '', descripcion: '', imagen: '', id: null });
    loadData();
  };

  const deleteGuideProfile = async (id) => {
    if (confirm('¿Eliminar esta guía?')) {
      await axios.delete(`${API}/api/guides/${id}`, { withCredentials: true });
      loadData();
    }
  };

  useEffect(() => {
    axios.get(`${API}/api/auth/verifySession`, { withCredentials: true })
      .then(() => {
        setIsLogged(true);
        loadData(); 
      })
      .catch(async () => {
        setIsLogged(false);
        try {
          await axios.post(`${API}/api/auth/logoutjwt`, {}, { withCredentials: true });
          window.location.href = '/loginjwt';
        } catch (err) {
          console.error('Error cerrando sesión automáticamente', err);
        }
      });
  }, []);
 
  if (!isLogged) {
    return (
      <div className="login-panel">
        <form onSubmit={login} className="login-form">
          <h2>Login Admin</h2>
          <input className="form-field" placeholder="Usuario" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} required />
          <input className="form-field" type="password" placeholder="Contraseña" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} required />
          <button className="button" type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  let blogFormTitle;
  if (blogForm.id !== null) {
    blogFormTitle = 'Editar Blog';
  } else {
    blogFormTitle = 'Nuevo Blog';
  }
  
  let marketFormTitle;
  if (marketForm.id !== null) {
    marketFormTitle = 'Editar Anuncio';
  } else {
    marketFormTitle = 'Nuevo Anuncio';
  }
  
  let guideFormTitle;
  if (guideForm.id !== null) {
    guideFormTitle = 'Editar Guía';
  } else {
    guideFormTitle = 'Nueva Guía';
  }

  return (
    <div className="admin-panel">
      <h1>Panel Admin</h1>
      <p>Bienvenido al panel de administración. Aquí puedes gestionar los blogs, anuncios y guías.</p>
      <div className="button-container">
        <button className="button" onClick={logout}>Cerrar sesión</button>
      </div>

      <hr />
      <form className="admin-form" onSubmit={saveBlogPost}>
        <h3>{blogFormTitle}</h3>
        <input className="form-field" placeholder="Título" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} required />
        <textarea className="form-field" placeholder="Contenido" value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} required />
        <input className="form-field" placeholder="Imagen" value={blogForm.image} onChange={e => setBlogForm({ ...blogForm, image: e.target.value })} />
        <button className="button" type="submit">Guardar</button>
      </form>
      {blogPosts.map(blog => (
        <div key={blog._id} className="item-entry">
          <div className="item-title">
            <strong>{blog.title}</strong>
          </div>
          <div className="item-actions">
            <button className="button" onClick={() => setBlogForm({ ...blog, id: blog._id })}>Editar</button>
            <button className="button" onClick={() => deleteBlogPost(blog._id)}>Eliminar</button>
          </div>
        </div>
      ))}

      <hr />
      <form className="admin-form" onSubmit={saveMarketItem}>
        <h3>{marketFormTitle}</h3>
        <input className="form-field" placeholder="Título" value={marketForm.title} onChange={e => setMarketForm({ ...marketForm, title: e.target.value })} required />
        <textarea className="form-field" placeholder="Descripción" value={marketForm.description} onChange={e => setMarketForm({ ...marketForm, description: e.target.value })} required />
        <input className="form-field" type="number" placeholder="Precio" value={marketForm.price} onChange={e => setMarketForm({ ...marketForm, price: e.target.value })} />
        <input className="form-field" placeholder="Imagen" value={marketForm.imageUrl} onChange={e => setMarketForm({ ...marketForm, imageUrl: e.target.value })} />
        <button className="button" type="submit">Guardar</button>
      </form>
      {marketItems.map(item => (
        <div key={item._id} className="item-entry">
          <div className="item-title">
            <strong>{item.title}</strong>
          </div>
          <div className="item-actions">
            <button className="button" onClick={() => setMarketForm({ ...item, id: item._id })}>Editar</button>
            <button className="button" onClick={() => deleteMarketItem(item._id)}>Eliminar</button>
          </div>
        </div>
      ))}

      <hr />
      <form className="admin-form" onSubmit={saveGuideProfile}>
        <h3>{guideFormTitle}</h3>
        <input className="form-field" placeholder="Nombre" value={guideForm.nombre} onChange={e => setGuideForm({ ...guideForm, nombre: e.target.value })} required />
        <input className="form-field" placeholder="Teléfono" value={guideForm.telefono} onChange={e => setGuideForm({ ...guideForm, telefono: e.target.value })} />
        <input className="form-field" placeholder="Email" value={guideForm.CorreoElectronico} onChange={e => setGuideForm({ ...guideForm, CorreoElectronico: e.target.value })} />
        <textarea className="form-field" placeholder="Descripción" value={guideForm.descripcion} onChange={e => setGuideForm({ ...guideForm, descripcion: e.target.value })} required />
        <input className="form-field" placeholder="Imagen" value={guideForm.imagen} onChange={e => setGuideForm({ ...guideForm, imagen: e.target.value })} />
        <button className="button" type="submit">Guardar</button>
      </form>
      {guideProfiles.map(profile => (
        <div key={profile._id} className="item-entry">
          <div className="item-title">
            <strong>{profile.nombre}</strong>
          </div>
          <div className="item-actions">
            <button className="button" onClick={() => setGuideForm({ ...profile, id: profile._id })}>Editar</button>
            <button className="button" onClick={() => deleteGuideProfile(profile._id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
