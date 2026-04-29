import React from 'react';
import { UserCircle } from 'lucide-react';

const DashboardBanner = () => {
  return (
    <div className="banner-card">
      <div className="banner-content">
        <div className="banner-icon">
          <UserCircle size={48} />
        </div>
        <div className="banner-info">
          <p>Panel de Control</p>
          <h2>Control Escolar</h2>
          <p>Resumen del estado actual de la institución.</p>
          <span className="banner-tag">Ciclo Escolar 2026</span>
        </div>
      </div>
      <div className="banner-stats">
        <div className="stat-group">
          <span className="stat-value">1,245</span>
          <span className="stat-label">Alumnos</span>
        </div>
        <div className="stat-group">
          <span className="stat-value">20</span>
          <span className="stat-label">Materias</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
