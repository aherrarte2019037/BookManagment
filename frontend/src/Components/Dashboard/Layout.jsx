import React, { useState } from 'react';
import './Layout.css';

// Define el componente de botón de la barra lateral que acepta ícono y texto
const SidebarButton = ({ icon, text, onClick, isExpanded }) => (
  <button className="sidebar-item" onClick={onClick}>
    <span className="icon">{icon}</span>
    {isExpanded && <span className="text">{text}</span>}
  </button>
);

const Sidebar = ({ onChangeContent }) => {
  // Estado para controlar la expansión de la Sidebar
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <SidebarButton
        icon={<img src="/icons8-book-30.png" alt="Nuevo Libro" />}
        text="Nuevo Libro"
        onClick={() => onChangeContent("Nuevo Libro")}
        isExpanded={isExpanded}
      />
      <SidebarButton
        icon={<img src="/icons8-order-history-30.png" alt="Pedidos" />}
        text="Pedidos"
        onClick={() => onChangeContent("Pedidos")}
        isExpanded={isExpanded}
      />
      <SidebarButton
        icon={<img src="/icons8-total-sales-30.png" alt="Ventas" />}
        text="Ventas"
        onClick={() => onChangeContent("Ventas")}
        isExpanded={isExpanded}
      />
      <SidebarButton
        icon={<img src="/icons8-trolley-30.png" alt="Inventario" />}
        text="Inventario"
        onClick={() => onChangeContent("Inventario")}
        isExpanded={isExpanded}
      />
    </div>
  );
};

const NavbarButton = ({ icon, onClick }) => (
  <button className="navbar-item" onClick={onClick}>
    <span className="icon">{icon}</span>
  </button>
);

const Navbar = ({ onChangeContent }) => (
  <div className="navbar">
    <NavbarButton
      icon={<img src="/icons8-settings-40.png" alt="Configuración" />}
      onClick={() => onChangeContent("Configuración")}
    />
    <NavbarButton
      icon={<img src="/icons8-logout-40.png" alt="Cerrar Sesión" />}
      onClick={() => onChangeContent("Cerrar Sesión")}
    />
  </div>
);

const Content = ({ activeContent }) => {
  const renderContent = () => {
    switch (activeContent) {
      case "Nuevo Libro":
        return (
          <div className="new-book-form">
            <h2>Nuevo Libro</h2>
            <form>
              <label htmlFor="editorial">Editorial</label>
              <input type="text" id="editorial" name="editorial" placeholder="Ingresa la editorial" />

              <label htmlFor="titulo">Título del Libro</label>
              <input type="text" id="titulo" name="titulo" placeholder="Ingresa el título del libro" />

              <label htmlFor="precio">Precio de Venta</label>
              <input type="text" id="precio" name="precio" placeholder="Ingresa el precio de venta" />

              <button type="submit">Agregar Libro</button>
            </form>
          </div>
        );
        case "Configuración":
        return (
          <div>
            <h2>Configuración</h2>
            {/* Opciones de configuración */}
          </div>
        );
        case "Cerrar Sesión":
        // Manejar la lógica de cerrar sesión
        return <h2>Cerrando sesión...</h2>;
      // Agrega más casos para otros tipos de contenido si es necesario
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
  // Estado para controlar el contenido activo
  const [activeContent, setActiveContent] = useState("Home");

  // Función para cambiar el contenido activo
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