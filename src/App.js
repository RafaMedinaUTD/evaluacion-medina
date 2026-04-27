import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Descargas from './Descargas';
import Documentacion2 from './Documentacion2';
import logo from './logo.JPG'; // Usamos tu logo original como imagen por defecto
import './App.css';

// Decodificar token JWT de Google
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
}

// Layout común después del login
function Layout({ children, user, onLogout }) {
  return (
    <div className="App">
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 30px',
        backgroundColor: '#282c34',
        color: 'white',
        borderBottom: '1px solid #61dafb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src={user?.picture || logo}  // Si no hay foto de Google, usa el logo
            alt="avatar" 
            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <strong>{user?.name || 'Usuario'}</strong><br />
            <small>{user?.email || ''}</small>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: '#61dafb', textDecoration: 'none' }}>INICIO</Link>
          <Link to="/descargas" style={{ color: '#61dafb', textDecoration: 'none' }}>PARCIAL 1</Link>
          <Link to="/documentacion2" style={{ color: '#61dafb', textDecoration: 'none' }}>PARCIAL 2</Link>
        </div>
        <button onClick={onLogout} style={{
          padding: '8px 16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          CERRAR SESIÓN
        </button>
      </header>
      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}

// Página de inicio / Dashboard después del login
function DashboardHome({ user }) {
  const handleJiraRedirect = () => {
    window.open("https://ingreyeslara.atlassian.net/jira/software/projects/SIB/boards/445?atlOrigin=eyJpIjoiMDEyNjU0MzMzYjgxNDFlYTg0MTRjNjMyNDllNmNjZmYiLCJwIjoiaiJ9", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="App-header" style={{ textAlign: 'center' }}>
      <img src={logo} className="App-logo" alt="logo" style={{ height: '200px', marginBottom: '20px' }} />
      
      <h1>Evaluación Parcial 3</h1>
      <h3>Bienvenido(a), {user?.name || 'Alumno'}</h3>
      
      <a
        className="App-link"
        href="https://www.linkedin.com/in/rafael-abraham-casta%C3%B1eda-medina-b605093a4?trk=contact-info&authuser=1"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginBottom: '15px', display: 'inline-block' }}
      >
        LINKEDIN DE MI PERFIL
      </a>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', margin: '30px 0' }}>
        <Link to="/descargas" className="App-link" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#282c34', color: 'white', border: '1px solid #61dafb', borderRadius: '8px', cursor: 'pointer' }}>
            📄 DOCUMENTACIÓN PARCIAL 1
          </button>
        </Link>
        
        <Link to="/documentacion2" className="App-link" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#282c34', color: 'white', border: '1px solid #61dafb', borderRadius: '8px', cursor: 'pointer' }}>
            📑 DOCUMENTACIÓN PARCIAL 2
          </button>
        </Link>
      </div>

      <div style={{ margin: '20px 0' }}>
        <a 
          href="https://www.medikt.com.mx/practicas/ers.pdf" 
          download="ERS_Proyecto.pdf"
          style={{ textDecoration: 'none' }}
        >
          <button style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ⬇️ DESCARGAR DOCUMENTO ERS DEL PROYECTO
          </button>
        </a>
      </div>

      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={handleJiraRedirect}
          style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#0052cc', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          🎯 TABLERO JIRA PROYECTO SIBA
        </button>
      </div>
    </div>
  );
}

// Componente principal
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const clientId = "941946385897-fg0819kmq26rhoj75giiq6v9lupbcsp4.apps.googleusercontent.com"; // Cámbialo si es necesario

  const onSuccess = (response) => {
    console.log("Login exitoso", response);
    if (response.credential) {
      const decoded = parseJwt(response.credential);
      if (decoded) {
        setUserData({
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture
        });
        setIsLoggedIn(true);
      } else {
        setUserData({ name: "Rafael Abraham", email: "alumno@ejemplo.com", picture: null });
        setIsLoggedIn(true);
      }
    }
  };

  const onError = () => {
    console.log("Error en login de Google");
    alert("No se pudo iniciar sesión. Intenta de nuevo.");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        {!isLoggedIn ? (
          <div className="App">
            <header className="App-header">
              <div>
                <img src={logo} width="30%" alt="perfil" />
              </div>
              <h1>ANÁLISIS Y DISEÑO DE SOFTWARE</h1>
              <h2>Alumno(a): Rafael Abraham Castañeda Medina</h2>

              <a
                className="App-link"
                href="https://www.linkedin.com/in/rafael-abraham-casta%C3%B1eda-medina-b605093a4?trk=contact-info&authuser=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN DE MI PERFIL
              </a>
              <br />
              <a
                className="App-link"
                href="https://www.medikt.com.mx/practicas/documentacion.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOCUMENTACIÓN PARCIAL 1 (externa)
              </a>
              <br />
              <a
                className="App-link"
                href="https://www.medikt.com.mx/practicas/parcial_2.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOCUMENTACIÓN PARCIAL 2 (externa)
              </a>

              <div style={{ margin: '30px' }}>
                <GoogleLogin
                  onSuccess={onSuccess}
                  onError={onError}
                  useOneTap
                  theme="outline"
                  shape="rectangular"
                />
              </div>
            </header>
          </div>
        ) : (
          <Layout user={userData} onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<DashboardHome user={userData} />} />
              <Route path="/descargas" element={<Descargas />} />
              <Route path="/documentacion2" element={<Documentacion2 />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        )}
      </Router>
    </GoogleOAuthProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
