import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Descargas from './Descargas';
import Documentacion2 from './Documentacion2';
import logo from './logo.JPG';
import './App.css';

// --- COMPONENTE DE PROYECTO FINAL ---
function ProyectoFinal() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Proyecto Final: Peluches</h1>
        
        {/* Botón para descargar el PDF desde la carpeta public */}
        <a
          className="App-link"
          href="/Documentacion_ERS.pdf"
          download="Documentacion_ERS.pdf"
          style={{ marginTop: '20px', padding: '10px', backgroundColor: '#333', borderRadius: '8px', textDecoration: 'none', color: 'white' }}
        >
          📄 Descargar Documentación ERS
        </a>

        {/* Botón hacia Jira */}
        <a
          className="App-link"
          href="AQUI_PON_EL_LINK_DE_TU_TABLERO_JIRA"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: '15px', padding: '10px', backgroundColor: '#0052CC', borderRadius: '8px', textDecoration: 'none', color: 'white' }}
        >
          📊 Tablero Jira Proyecto Peluches
        </a>

        {/* Botón para regresar al inicio */}
        <Link className="App-link" to="/" style={{ marginTop: '30px', color: '#ff6b6b' }}>
          ⬅ Regresar
        </Link>
      </header>
    </div>
  );
}

// --- COMPONENTE DE INICIO (TU PERFIL) ---
function Home({ user, onLogout }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ height: '350px', marginBottom: '20px' }} />
        
        <h1>Evaluación Parcial 1</h1>
        <h3>Alumno(a): Rafael Abraham Castañeda Medina</h3>
        
        {user && (
          <div style={{ marginBottom: '15px' }}>
            <p>✅ Conectado como: <strong>{user.name}</strong> ({user.email})</p>
            <button onClick={onLogout} style={{ marginTop: '5px', padding: '5px 10px' }}>
              Cerrar sesión
            </button>
          </div>
        )}
        
        <a
          className="App-link"
          href="https://www.linkedin.com/in/rafael-abraham-casta%C3%B1eda-medina-b605093a4?trk=contact-info&authuser=1"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginBottom: '15px', marginTop: '10px' }}
        >
          LINKED IN DE MI PROFILE
        </a>
        
        <Link className="App-link" to="/descargas" style={{ marginTop: '10px' }}>
          DOCUMENTACION PARCIAL 1
        </Link>

        <Link className="App-link" to="/documentacion2" style={{ marginTop: '10px' }}>
          DOCUMENTACION PARCIAL 2
        </Link>

        {/* NUEVO BOTÓN PROYECTO FINAL */}
        <Link className="App-link" to="/proyectofinal" style={{ marginTop: '10px', color: '#4CAF50' }}>
          PROYECTO FINAL
        </Link>
      </header>
    </div>
  );
}

// --- PANTALLA DE LOGIN ---
function LoginScreen({ onLoginSuccess }) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Cargar la librería de Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {};
  }, []);

  const handleGoogleLogin = () => {
    if (!window.google) {
      alert('La librería de Google aún no se ha cargado. Intenta de nuevo.');
      return;
    }

    const clientId = '362434163876-3mnfsvo80fta2eivk97s82nr51hal8t5.apps.googleusercontent.com'; 

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'email profile',
      callback: (tokenResponse) => {
        if (tokenResponse.access_token) {
          // Obtener info del usuario usando el access_token
          fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
          })
            .then(res => res.json())
            .then(userInfo => {
              onLoginSuccess({
                name: userInfo.name,
                email: userInfo.email,
                picture: userInfo.picture
              });
            })
            .catch(err => console.error('Error al obtener perfil:', err));
        }
      },
    });

    client.requestAccessToken();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ height: '350px', marginBottom: '20px' }} />
        <h1>Evaluación Parcial 1</h1>
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
        
        {/* Botón de Google */}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleGoogleLogin}
            disabled={!isScriptLoaded}
            style={{
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 auto'
            }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '20px' }} />
            Iniciar sesión con Google
          </button>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>
            {!isScriptLoaded ? 'Cargando...' : 'Haz clic para acceder'}
          </p>
        </div>
      </header>
    </div>
  );
}

// --- APP PRINCIPAL CON RUTAS Y LOGIN ---
function App() {
  const [user, setUser] = useState(null);

  // Verificar si ya hay sesión guardada en localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('google_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('google_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('google_user');
  };

  return (
    <Router>
      {!user ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Routes>
          <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
          <Route path="/descargas" element={<Descargas />} />
          <Route path="/documentacion2" element={<Documentacion2 />} />
          <Route path="/proyectofinal" element={<ProyectoFinal />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;