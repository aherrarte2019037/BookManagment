import React, { useState } from 'react';
import './Layout.css';
import Sidebar from '../Sidebar/Sidebar'; 
import AddBook from '../AddBook/AddBook';
import AddOrder from '../AddOrder/AddOrder';
import ProfileConfig from '../ProfileConfig/ProfileConfig';
import AddSale from '../AddSale/AddSale';
import HomePage from '../HomePage/HomePage';
import Contact from '../Contact/Contact';
import Inventario from '../Inventario/Inventario';
import BookDetail from '../BookDetail/BookDetail';

//Posible de expandir
const CONTENT_COMPONENTS = {
  Home: HomePage,
  "Nuevo Libro": AddBook,
  Pedidos: AddOrder,
  Ventas: AddSale,
  Configuración: ProfileConfig,
  "Contáctanos": Contact,
  Inventario: Inventario,
  "Cerrar Sesión": () => <h2>Cerrando sesión...</h2>,
  BookDetail: BookDetail
};

// Componente que maneja el contenido dinámico
const Content = ({ activeContent, selectedBook, onBack, onChangeContent }) => {
  const ActiveComponent = CONTENT_COMPONENTS[activeContent] || (() => <div>{activeContent}</div>);
  return (
    <div className="content">
      <ActiveComponent 
        book={selectedBook} 
        onBack={onBack} 
        onChangeContent={onChangeContent} 
      />
    </div>
  );
};

const Layout = () => {
  const [activeContent, setActiveContent] = useState("Home");
  const [selectedBook, setSelectedBook] = useState(null);

  // Función que maneja cambio de contenido y selecciona libro
  const handleContentChange = (content, book = null) => {
    setActiveContent(content);
    setSelectedBook(book);
  };

  return (
    <div className="layout">
      <Sidebar onChangeContent={handleContentChange} />
      <Content 
        activeContent={activeContent} 
        selectedBook={selectedBook} 
        onBack={() => handleContentChange('Home')} 
        onChangeContent={handleContentChange} 
      />
    </div>
  );
};

export default Layout;