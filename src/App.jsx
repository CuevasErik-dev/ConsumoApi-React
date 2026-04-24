import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">
      </main>
    </div>
  );
}

export default App;
