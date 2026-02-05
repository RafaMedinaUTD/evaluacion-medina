import React from 'react';
import { Link } from 'react-router-dom';

function Descargas() {
  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', // Usar minHeight para evitar cortes en pantallas pequeñas
      backgroundColor: '#f8f9fa',
    },
    card: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      textAlign: 'center',
      width: '500px',
      maxWidth: '90%'
    },
    title: {
      color: '#0d6efd',
      marginBottom: '10px',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    subtitle: {
      color: '#6c757d',
      fontSize: '14px',
      marginBottom: '30px'
    },
    // Estilos de los botones
    buttonBlue: {
      backgroundColor: '#0d6efd',
      color: 'white',
      padding: '12px',
      width: '100%',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600'
    },
    buttonGreen: {
      backgroundColor: '#198754',
      color: 'white',
      padding: '12px',
      width: '100%',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600'
    },
    buttonDark: {
      backgroundColor: '#212529',
      color: 'white',
      padding: '12px',
      width: '100%',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600'
    },
    // Estilo para el enlace de descarga (quita el subrayado azul feo)
    downloadLink: {
      textDecoration: 'none',
      display: 'block',
      marginBottom: '10px'
    },
    linkButton: {
      textDecoration: 'none',
      display: 'block',
      width: '100%',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.title}>Centro de Descargas</h2>
        <p style={styles.subtitle}>Haz clic en los botones para obtener tus archivos PDF.</p>

        {/* NOTA: La ruta '/files/...' busca automáticamente en la carpeta 'public'.
           El atributo 'download' fuerza la descarga en lugar de abrirlo en el navegador.
        */}

        {/* 1. Comandos de React */}
        <a href="/files/comandos.pdf" download="Comandos_React.pdf" style={styles.downloadLink}>
          <button style={styles.buttonBlue}>COMANDOS BÁSICOS DE REACT</button>
        </a>

        {/* 2. Estándar IEEE */}
        <a href="/files/ieee.pdf" download="Estandar_IEEE_29148.pdf" style={styles.downloadLink}>
          <button style={styles.buttonGreen}>ISO / ESTANDAR IEEE</button>
        </a>

        {/* 3. Requerimientos */}
        <a href="/files/requerimientos.pdf" download="Requerimientos_Software.pdf" style={styles.downloadLink}>
          <button style={styles.buttonDark}>REQUERIMIENTOS FUNCIONALES Y NO FUNCIONALES</button>
        </a>

        {/* 4. Algoritmo SHA-256 */}
        <a href="/files/sha_256.pdf" download="Codigo_SHA256_Python.pdf" style={styles.downloadLink}>
          <button style={styles.buttonDark}>CÓDIGO PYTHON ALGORITMO SHA-256</button>
        </a>

        {/* Botón Regresar */}
        <Link to="/" style={styles.linkButton}>
          <button style={styles.buttonDark}>REGRESAR AL PROYECTO PRINCIPAL</button>
        </Link>
      </div>
    </div>
  );
}

export default Descargas;