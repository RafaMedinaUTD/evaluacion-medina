import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Descargas from './Descargas'; // Mantenemos Parcial 1
import Documentacion2 from './Documentacion2'; // IMPORTAMOS EL NUEVO ARCHIVO
import logo from './logo.JPG'; // Tu logo original
import './App.css'; // Tus estilos originales

// --- COMPONENTE DE INICIO (TU PERFIL) ---
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ height: '350px', marginBottom: '20px' }} />
        
        <h1>Evaluación parcial 1</h1>
        <h3>Alumno(a): Rafael Abraham Castañeda Medina</h3>
        
        <a
          className="App-link"
          href="https://www.linkedin.com/in/rafael-abraham-casta%C3%B1eda-medina-b605093a4?trk=contact-info&authuser=1"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginBottom: '15px', marginTop: '10px' }}
        >
          LINKED IN DE MI PROFILE
        </a>
        
        {/* Enlace original a Parcial 1 */}
        <Link
          className="App-link"
          to="/descargas"
          style={{ marginTop: '10px' }}
        >
          DOCUMENTACION PARCIAL 1
        </Link>

        {/* --- ENLACE NUEVO A PARCIAL 2 --- */}
        <Link
          className="App-link"
          to="/documentacion2"
          style={{ marginTop: '10px' }}
        >
          DOCUMENTACION PARCIAL 2
        </Link>
      </header>
    </div>
  );
}

// --- CONFIGURACIÓN DE RUTAS ---
function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta Principal: Tu Perfil */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta Parcial 1: Descargas PDFs */}
        <Route path="/descargas" element={<Descargas />} />

        {/* --- NUEVA RUTA PARCIAL 2: Menú de Imágenes --- */}
        <Route path="/documentacion2" element={<Documentacion2 />} />
      </Routes>
    </Router>
  );
}

export default App;