import "./RouteStats.css"

const RouteStats = ({ stats }) => (
  <div className="stats-container">
    <div className="stats-info">
      <h3>Resumen de tus rutas</h3>
      <p className="stats-explanation">
        Aquí puedes ver un resumen de todas las rutas que has creado: cuántas tienes, cuántas has completado y la duración total estimada.
      </p>
      <p><strong>Total de rutas:</strong> {stats.totalRutas}</p>
      <p><strong>Completadas:</strong> {stats.rutasCompletadas}</p>
      <p><strong>Duración total:</strong> {stats.duracionTotal} horas</p>
    </div>

    <div className="stats-image">
      <img src="/ruta-estadisticas.jpg" alt="Ilustración de rutas" />
    </div>
  </div>
);

export default RouteStats;
