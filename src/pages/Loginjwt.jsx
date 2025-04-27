import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

const Loginjwt = () => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/loginjwt`, loginForm, { withCredentials: true });
      navigate('/admin');
    } catch (err) {
      console.error('Error al iniciar sesión JWT:', err);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleLogin} className="form-container">
      <h2>Login Admin</h2>
      <input
        className="form-input"
        placeholder="Usuario"
        value={loginForm.username}
        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
        required
      />
      <input
        className="form-input"
        type="password"
        placeholder="Contraseña"
        value={loginForm.password}
        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        required
      />
      <button type="submit" className="form-button">Entrar</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Loginjwt;
