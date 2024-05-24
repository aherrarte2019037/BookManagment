import React, { useState } from 'react';
import './Layout.css';
import Sidebar from '../Sidebar/Sidebar'; // Asegúrate de que la ruta sea correcta
import AddBook from '../AddBook/AddBook';
import AddOrder from '../AddOrder/AddOrder';
import ProfileConfig from '../ProfileConfig/ProfileConfig';
import AddSale from '../AddSale/AddSale';
import HomePage from "../HomePage/HomePage";
import Contact from '../Contact/Contact';

const Content = ({ activeContent }) => {
  const renderContent = () => {
    switch (activeContent) {
      case "Home":
        return <HomePage />
      case "Nuevo Libro":
        return <AddBook />;
      case "Pedidos":
        return <AddOrder />;
      case "Ventas":
        return <AddSale />
      case "Configuración":
        return <ProfileConfig />;
      case "Contáctanos":
        return <Contact />
      case "Cerrar Sesión":
        return <h2>Cerrando sesión...</h2>;
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

  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="layout">
      <Sidebar onChangeContent={handleContentChange} />
      <Content activeContent={activeContent} />
    </div>
  );
};

export default Layout;