import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h1>Andando Voy</h1>
      <button className="menu-toggle" onClick={toggleMenu}>
      ☰
      </button>
      <ul className={menuOpen ? 'open' : ''}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
        <li><a href="#rutas" onClick={() => setMenuOpen(false)}>Rutas</a></li>
        <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
        <li><Link to="/marketplace" onClick={() => setMenuOpen(false)}>Marketplace</Link></li>
        {user ? (
          <>
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><button onClick={async () => { await handleLogout(); setMenuOpen(false); }}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
