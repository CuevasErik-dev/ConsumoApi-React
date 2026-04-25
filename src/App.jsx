import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

// Importación de las páginas siguiendo la arquitectura de capas
import DashboardPage from './pages/dashboard/DashboardPage';
import AlumnosPage from './pages/alumnos/AlumnosPage';
import MateriasPage from './pages/materias/MateriasPage';
import SemestrePage from './pages/semestre/SemestrePage';

import './styles.css';

function App() {
  return (
    <div className="app-container">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <main className="content">
        <Routes>
          {/* Redirección inicial */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Definición de rutas cargando los componentes de las páginas */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/alumnos" element={<AlumnosPage />} />
          <Route path="/materias" element={<MateriasPage />} />
          <Route path="/semestre" element={<SemestrePage />} />
          
          {/* Ruta para manejar 404 - Not Found */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
