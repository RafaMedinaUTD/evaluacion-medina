import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Documentacion2() {
  // --- ESTADOS PARA EL MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');

  // Funciones para abrir y cerrar el modal
  const openModal = (imageName, title) => {
    setCurrentImage(`/images/parcial2/${imageName}.png`); // Ruta de tu imagen
    setCurrentTitle(`Vista de ${title}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
  };

  // --- ESTILOS VISUALES ---
  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#333333',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
      position: 'relative' // Necesario para el contexto del modal
    },
    headerArea: {
      textAlign: 'center',
      marginBottom: '30px',
      maxWidth: '1000px'
    },
    mainTitle: {
      fontSize: '2rem',
      fontWeight: 'normal',
      marginBottom: '15px'
    },
    questionTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    descriptionText: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#555',
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginTop: '20px',
      marginBottom: '30px',
      textTransform: 'uppercase'
    },
    buttonRow: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '15px',
      width: '100%',
      maxWidth: '900px'
    },
    methodologyButton: {
      flex: '1',
      minWidth: '150px',
      maxWidth: '200px',
      padding: '12px',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '12px',
      cursor: 'pointer',
      textTransform: 'uppercase',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'opacity 0.2s'
    },
    outlineButton: {
      backgroundColor: 'transparent',
      border: '1px solid #007bff',
      color: '#007bff',
      padding: '10px 30px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
    divider: {
      width: '80%',
      maxWidth: '1000px',
      height: '1px',
      backgroundColor: '#cccccc',
      border: 'none',
      margin: '40px 0'
    },
    linkWrapper: {
      textDecoration: 'none',
      display: 'inline-block'
    },
    footerArea: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '1.2rem',
      fontWeight: 'bold'
    },
    // --- ESTILOS DEL MODAL ---
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro semitransparente
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '800px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      borderBottom: '1px solid #e5e5e5'
    },
    modalTitle: {
      margin: 0,
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#333'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#888'
    },
    modalBody: {
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9', // Fondo ligerito para que resalte la imagen
      minHeight: '300px'
    },
    imagePreview: {
      maxWidth: '100%',
      maxHeight: '70vh',
      objectFit: 'contain'
    }
  };

  // --- COMPONENTE HELPER PARA BOTONES DE METODOLOGÍA ---
  // Ahora en lugar de un enlace <a>, usa un botón que activa el modal
  const MethodologyButton = ({ imageName, buttonText, customColor }) => (
    <button
      onClick={() => openModal(imageName, buttonText)}
      style={{ ...styles.methodologyButton, backgroundColor: customColor }}
      title={`Ver ${buttonText}`}
    >
      {buttonText}
    </button>
  );

  return (
    <div style={styles.pageContainer}>
      
      {/* --- ENCABEZADO Y DESCRIPCIÓN --- */}
      <div style={styles.headerArea}>
        <h1 style={styles.mainTitle}>METODOLOGÍAS DE DESARROLLO DE SW</h1>
        <h2 style={styles.questionTitle}>¿Qué es una metodología de desarrollo de software?</h2>
        <p style={styles.descriptionText}>
          Las metodologías de desarrollo de software son un conjunto de técnicas y métodos organizativos que se aplican para diseñar soluciones de software informático. El objetivo de las distintas metodologías es el de intentar organizar los equipos de trabajo para que estos desarrollen las funciones de un programa de la mejor manera posible.
        </p>
        <h3 style={styles.sectionTitle}>TIPOS DE METODOLOGÍAS</h3>
      </div>

      <hr style={styles.divider} />

      {/* --- BOTONES DE METODOLOGÍAS --- */}
      <div style={styles.buttonRow}>
        <MethodologyButton imageName="cascada" buttonText="CASCADA" customColor="#0d6efd" />
        <MethodologyButton imageName="modelo_v" buttonText="MODELO V" customColor="#6c757d" />
        <MethodologyButton imageName="agiles" buttonText="ÁGILES" customColor="#198754" />
        <MethodologyButton imageName="scrum" buttonText="SCRUM" customColor="#dc3545" />
      </div>

      <div style={styles.buttonRow}>
        <MethodologyButton imageName="kanban" buttonText="KANBAN" customColor="#ffc107" />
        <MethodologyButton imageName="xp" buttonText="XP" customColor="#0dcaf0" />
        <MethodologyButton imageName="hibridas" buttonText="HÍBRIDAS" customColor="#212529" />
      </div>

      <hr style={styles.divider} />

      {/* --- SECCIÓN JIRA --- */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px' }}>LINK A TABLERO DE TRABAJO</h3>
      <a
        href="https://utd-team-zzukmk8m.atlassian.net/jira/software/projects/MET/boards/1?atlOrigin=eyJpIjoiZDc0NWQ3MWYwNjY2NGQ4N2I5OTAwNmY5OGM5OWIwMjYiLCJwIjoiaiJ9"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.linkWrapper}
        title="Ir a proyecto JIRA"
      >
        <button style={styles.outlineButton}>
          ---- JIRA ----
        </button>
      </a>

      <hr style={styles.divider} />

      {/* --- SECCIÓN REGRESAR, FRASE Y NOMBRE --- */}
      <Link to="/" style={{ ...styles.linkWrapper, marginBottom: '30px' }}>
        <button style={styles.outlineButton}>
          ---- REGRESAR MENÚ PRINCIPAL ----
        </button>
      </Link>

      <div style={styles.footerArea}>
        <p style={{ marginBottom: '30px' }}>
          No esperes a que te necesiten, Crea esa necesidad
        </p>
        <p>
          Alumno: Rafael Abraham Castañeda Medina
        </p>
      </div>

      {/* --- RENDERIZADO DEL MODAL (Condicional) --- */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          {/* Evitamos que dar clic dentro del modal lo cierre */}
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h4 style={styles.modalTitle}>{currentTitle}</h4>
              <button style={styles.closeButton} onClick={closeModal}>
                &#x2715; {/* Símbolo de "X" */}
              </button>
            </div>
            <div style={styles.modalBody}>
              <img 
                src={currentImage} 
                alt={currentTitle} 
                style={styles.imagePreview} 
                // Mensaje en caso de que la imagen aún no esté en la carpeta
                onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML = 'Imagen no encontrada en la ruta'; }} 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Documentacion2;