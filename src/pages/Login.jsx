import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log('ID Token:', idToken);

      await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken }),
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleLogin} className="form-container">
      <h2>Iniciar sesión</h2>
      <input
        className="form-input"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="form-input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="form-button">Entrar</button>
      {error && <p className="error-message">{error}</p>}

      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </form>
  );
};

export default Login;

