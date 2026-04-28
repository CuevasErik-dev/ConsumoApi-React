import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { alumnosData, materiasCreditos, analisisSemestres, nuevosAlumnosYear } from '../../../data/mockData';

const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b'];

export const AlumnosChart = () => (
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
);

export const MateriasChart = () => (
  <div className="chart-card">
    <div className="chart-header">
      <h4>Materias por Créditos</h4>
      <span className="chart-badge">Proporción</span>
    </div>
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={materiasCreditos} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="materias" nameKey="name" isAnimationActive={false}>
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
);

export const SemestresChart = () => (
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
);

export const TendenciaChart = () => (
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
);
