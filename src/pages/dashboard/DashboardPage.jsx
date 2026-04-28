import React from 'react';
import { Users, BookOpen, Calendar } from 'lucide-react';
import TarjetaInf from '../../components/reutilizables/TarjetaInf';
import DashboardBanner from './components/DashboardBanner';
import { AlumnosChart, MateriasChart, SemestresChart, TendenciaChart } from './components/DashboardCharts';

const DashboardPage = () => {
  return (
    <div className="dashboard-grid">
      <DashboardBanner />

      <TarjetaInf icon={Users} titulo="Total Alumnos" valor="1,245" variante="blue" />
      <TarjetaInf icon={BookOpen} titulo="Materias Activas" valor="42" variante="green" />
      <TarjetaInf icon={Calendar} titulo="Semestres Totales" valor="8" variante="purple" />

      <AlumnosChart />
      <MateriasChart />
      <SemestresChart />
      <TendenciaChart />
    </div>
  );
};

export default DashboardPage;
