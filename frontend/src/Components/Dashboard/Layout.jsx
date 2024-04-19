import React, { useState } from 'react';
import './Layout.css';
import { supabase } from '../../Utils/supabase';
import { useNavigate } from 'react-router-dom';

const SidebarButton = ({ icon, text, onClick, isExpanded }) => (
  <button className="sidebar-item" onClick={onClick}>
    <span className="icon">{icon}</span>
    {isExpanded && <span className="text">{text}</span>}
  </button>
);

const Sidebar = ({ onChangeContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <SidebarButton
        icon={<img src="/Icono de la empresa.png" alt="Inicio" />}
        onClick={() => onChangeContent("Home")}
        isExpanded={isExpanded}
      />
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

const Navbar = ({ onChangeContent }) => {
  const navigation = useNavigate();

   async function signOut() {
    await supabase.auth.signOut();
    navigation('/login');
  }

  return (
    <div className="navbar">
      <NavbarButton
        icon={<img src="/icons8-settings-40.png" alt="Configuración" />}
        onClick={() => onChangeContent("Configuración")}
      />
      <NavbarButton
        icon={<img src="/icons8-logout-40.png" alt="Cerrar Sesión" />}
        onClick={signOut}
      />
    </div>
  )
};

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
        case "Pedidos":
          return (
            <div className="form-container">
              <div className="custom-table">
                <h3>Pedido</h3>
                <form>
                  <label htmlFor="tituloSolicitar">Título a solicitar</label>
                  <input type="text" id="tituloSolicitar" placeholder="Espacio para poder escribir texto" />
  
                  <label htmlFor="cantidad">Cantidad</label>
                  <input type="text" id="cantidad" placeholder="Espacio para poder escribir texto" />
  
                  <label htmlFor="nombreSolicitante">Nombre de colegio o distribuidor que lo solicita</label>
                  <input type="text" id="nombreSolicitante" placeholder="Espacio para poder escribir texto" />
  
                  <button type="submit">Enviar Pedido</button>
                </form>
              </div>
      case "Ventas":
        return (
          <div className="new-book-form-ventas">
            <h2>Nueva Venta</h2>
            <form>
              <label htmlFor="editorial">Temporada</label>
              <input type="text" id="editorial" name="editorial" placeholder="Ingrese la temporada" />

              <label htmlFor="titulo">Vendedor</label>
              <input type="text" id="titulo" name="titulo" placeholder="Ingresa el vendedor" />

              <label htmlFor="precio">Condiciones</label>
              <input type="text" id="precio" name="precio" placeholder="Ingresa las condiciones" />

              <label htmlFor="editorial">Fecha de entrega</label>
              <input type="text" id="editorial" name="editorial" placeholder="Ingresa la fecha de entrega" />

              <label htmlFor="titulo">Establecimiento</label>
              <input type="text" id="titulo" name="titulo" placeholder="Ingresa el establecimiento" />

              <label htmlFor="precio">Atencion</label>
              <input type="text" id="precio" name="precio" placeholder="Ingresa atencion" />

              <label htmlFor="editorial">Direccion</label>
              <input type="text" id="editorial" name="editorial" placeholder="Ingresa la direccion" />

              <label htmlFor="editorial">Telefono</label>
              <input type="text" id="editorial" name="editorial" placeholder="Ingresa el telefono" />

              <button type="submit">Agregar Producto</button>
            </form>
          </div>);
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
  const [activeContent, setActiveContent] = useState("Home");

  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="layout">
      <Sidebar onChangeContent={handleContentChange} />
      <div className="main">
        <Navbar onChangeContent={handleContentChange} />
        <Content activeContent={activeContent} />
      </div>
    </div>
  );
}

export default Layout;