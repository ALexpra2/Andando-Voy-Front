import './Footer.css';

const Footer = () => (
  <div className="footer">
    <div className="footer-container">
      <div className="footer-section brand">
        <h2>Andando Voy</h2>
        <p>Explora. Comparte. Vive cada ruta como una experiencia única.</p>
      </div>

      <div className="footer-section">
        <h3>Enlaces</h3>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="#rutas">Rutas</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/marketplace">Marketplace</a></li>
          <li><a href="/admin">Administrador</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Contacto</h3>
        <p>Email: contacto@andandovoy.com</p>
        <p>Teléfono: +34 600 123 456</p>
      </div>

      <div className="footer-section">
        <h3>Síguenos</h3>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Andando Voy. Todos los derechos reservados.</p>
    </div>
  </div>
);

export default Footer;
