import React, { useState } from 'react';
import './Layout.css';

const Sidebar = ({ onChangeContent }) => (
  <div className="sidebar">
    <button onClick={() => onChangeContent("New Book")}>Nuevo Libro</button>
    <button onClick={() => onChangeContent("Orders")}>Pedidos</button>
    <button onClick={() => onChangeContent("Shipments")}>Envios</button>
    <button onClick={() => onChangeContent("Stock")}>Inventario</button>
  </div>
);

const Navbar = () => (
  <div className="navbar">
    Navbar
  </div>
);

const Content = ({ activeContent }) => (
  <div className="content">
    {activeContent}
  </div>
);

const Layout = () => {
  // Estado para controlar el contenido activo
  const [activeContent, setActiveContent] = useState("Home");

  // Función para cambiar el contenido
  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="layout">
      <Sidebar onChangeContent={handleContentChange} />
      <div className="main">
        <Navbar />
        <Content activeContent={activeContent} />
      </div>
    </div>
  );
}

export default Layout;

