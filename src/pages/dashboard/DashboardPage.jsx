import React from 'react';
import { Users, BookOpen, Calendar, UserCircle, } from 'lucide-react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

import TarjetaInf from '../../components/reutilizables/TarjetaInf';

// Datos para las gráficas
const alumnosData = [
  { name: '1er Sem', total: 180 },
  { name: '2do Sem', total: 165 },
  { name: '3er Sem', total: 155 },
  { name: '4to Sem', total: 142 },
  { name: '5to Sem', total: 130 },
  { name: '6to Sem', total: 118 },
  { name: '7mo Sem', total: 105 },
  { name: '8vo Sem', total: 95 },
];

const materiasCreditos = [
  { name: '3 Créditos', materias: 15 },
  { name: '4 Créditos', materias: 12 },
  { name: '5 Créditos', materias: 8 },
  { name: '6 Créditos', materias: 7 },
];

const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b'];

const analisisSemestres = [
  { name: 'Sistema 1', value: 12 },
  { name: 'Sistema 2', value: 18 },
  { name: 'Sistema 3', value: 10 },
  { name: 'Sistema 4', value: 8 },
  { name: 'Sistema 5', value: 14 },
  { name: 'Sistema 6', value: 11 },
];

const nuevosAlumnosYear = [
  { year: '2020', total: 210 },
  { year: '2021', total: 198 },
  { year: '2022', total: 245 },
  { year: '2023', total: 230 },
  { year: '2024', total: 268 },
  { year: '2025', total: 280 },
];

const DashboardPage = () => {
  return (
    <div className="dashboard-grid">
      {/* Banner Principal */}
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

      <TarjetaInf icon={Users} titulo="Total Alumnos" valor="1,245" variante="blue" />
      <TarjetaInf icon={BookOpen} titulo="Materias Activas" valor="42" variante="green" />
      <TarjetaInf icon={Calendar} titulo="Semestres Totales" valor="8" variante="purple" />

      {/* Gráfica: Alumnos por Semestre */}
      <div className="chart-card span-2">
        <div className="chart-header">
          <h4>Alumnos por Semestre</h4>
          <span className="chart-badge">Distribución</span>
        </div>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <ReBarChart data={alumnosData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="total" name="Alumnos" fill="#3b82f6" radius={[4, 4, 0, 0]} isAnimationActive={false} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h4>Materias por Créditos</h4>
          <span className="chart-badge">Proporción</span>
        </div>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={materiasCreditos} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="materias" nameKey="name"
                isAnimationActive={false} >
                {materiasCreditos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h4>Análisis de Semestres</h4>
          <span className="chart-badge">Datos</span>
        </div>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <ReBarChart data={analisisSemestres} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={100} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Bar dataKey="value" name="Puntaje" fill="#a855f7" radius={[0, 4, 4, 0]} isAnimationActive={false} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card span-2">
        <div className="chart-header">
          <h4>Nuevos Alumnos por Año</h4>
          <span className="chart-badge">Tendencia</span>
        </div>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={nuevosAlumnosYear}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="total" name="Nuevos Alumnos" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
