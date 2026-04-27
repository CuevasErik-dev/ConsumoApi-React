import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Users, BookOpen, Calendar } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="logo-container">
          <GraduationCap size={26} color="white" />
        </div>
        <div className="brand-text">
          <span>Control Escolar</span>
        </div>
      </div>

      <div className="nav-divider"></div>

      <div className="nav-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/alumnos"
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Users size={20} />
          Alumnos
        </NavLink>

        <NavLink
          to="/materias"
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <BookOpen size={20} />
          Materia
        </NavLink>

        <NavLink
          to="/semestre"
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Calendar size={20} />
          Semestre
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
