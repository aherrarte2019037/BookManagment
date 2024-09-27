import React, { useState } from 'react';
import './Layout.css';
import Sidebar from '../Sidebar/Sidebar'; 
import AddBook from '../AddBook/AddBook';
import AddOrder from '../AddOrder/AddOrder';
import ProfileConfig from '../ProfileConfig/ProfileConfig';
import AddSale from '../AddSale/AddSale';
import HomePage from "../HomePage/HomePage";
import Contact from '../Contact/Contact';
import Inventario from '../Inventario/Inventario';
import BookDetail from '../BookDetail/BookDetail'; // Importa el componente de detalles del libro

// Componente que maneja el contenido dinámico
const Content = ({ activeContent, selectedBook, onBack, onChangeContent }) => {
  const renderContent = () => {
    switch (activeContent) {
      case "Home":
        return <HomePage onChangeContent={onChangeContent} />; // Pasar la función onChangeContent a HomePage para manejar el cambio a BookDetail
      case "Nuevo Libro":
        return <AddBook />;
      case "Pedidos":
        return <AddOrder />;
      case "Ventas":
        return <AddSale />;
      case "Configuración":
        return <ProfileConfig />;
      case "Contáctanos":
        return <Contact />;
      case "Inventario":  
        return <Inventario />;
      case "Cerrar Sesión":
        return <h2>Cerrando sesión...</h2>;
      case "BookDetail":  // Nueva opción para mostrar los detalles del libro
        return <BookDetail book={selectedBook} onBack={onBack} />;
      default:
        return <div>{activeContent}</div>;
    }
  };

  return (
    <div className="content">
      {renderContent()}
    </div>
  );
};

const Layout = () => {
  const [activeContent, setActiveContent] = useState("Home");
  const [selectedBook, setSelectedBook] = useState(null); // Estado para manejar el libro seleccionado

  // Función para manejar el cambio de contenido y seleccionar libro
  const handleContentChange = (content, book = null) => {
    setActiveContent(content); // Cambia el contenido activo
    setSelectedBook(book);     // Guarda el libro seleccionado, si existe
  };

  return (
    <div className="layout">
      <Sidebar onChangeContent={handleContentChange} />
      <Content 
        activeContent={activeContent} 
        selectedBook={selectedBook} 
        onBack={() => handleContentChange('Home')} // Función para regresar al carrusel
        onChangeContent={handleContentChange}     // Pasar la función de cambio de contenido
      />
    </div>
  );
};

export default Layout;

