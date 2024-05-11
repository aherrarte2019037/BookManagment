import React, { useState } from 'react';
import './Layout.css';
import { supabase } from '../../Utils/supabase';
import { useNavigate } from 'react-router-dom';
import AddBook from '../AddBook/AddBook';
import AddOrder from '../AddOrder/AddOrder';
import ProfileConfig from '../ProfileConfig/ProfileConfig';


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
      case "Home":
        return (
          <div className="new-book-form-home">
            <b><h1>Informacion General</h1></b>
            <form>
            <label htmlFor="editorial">¿Quienes somos?</label>
              <p>La Editorial Textos Escolares es una empresa guatemalteca líder en la producción y distribución de materiales educativos. Su enfoque en la innovación y la calidad la ha posicionado como un referente en el sector editorial. Con valores de ética, colaboración y compromiso social, la empresa busca contribuir al desarrollo integral de las comunidades educativas. Su visión es expandirse a nivel nacional e internacional, manteniendo su pasión por la educación y la mejora continua.</p>
              <label htmlFor="editorial">Mision</label>
              <p>Facilitar el acceso a una educación de calidad mediante la producción y distribución de materiales educativos innovadores y relevantes, comprometiéndonos con la excelencia en cada etapa de nuestro trabajo, desde la creación hasta la entrega final, para contribuir al desarrollo integral de las comunidades educativas.</p>
              <label htmlFor="editorial">Vision</label>
              <p>Nuestra visión es dejar una huella indeleble en la experiencia de conocimiento en los estudiantes, que sientan los libros de texto como un apoyo, un amigo de aprendizaje, donde puedan encontrar todo un mundo de conocimiento y experiencias, que los invite a querer aprender más, a experimentar en su propia vida las diferentes áreas que se puedan presentar.</p>
              <label htmlFor="editorial">Valores</label>
              <p>Compromiso con la calidad educativa: Nos comprometemos a ofrecer materiales educativos de alta calidad que promuevan el aprendizaje significativo y el desarrollo integral de los estudiantes.<br /><br />
Innovación constante: Buscamos constantemente nuevas formas de mejorar y adaptarnos a las necesidades cambiantes de las comunidades educativas, impulsando la innovación en cada aspecto de nuestro trabajo.<br /><br />
Ética y responsabilidad: Actuamos con integridad y responsabilidad en todas nuestras acciones, manteniendo altos estándares éticos en nuestras relaciones con empleados, autores, clientes y proveedores.<br /><br />
Colaboración y diversidad: Valoramos la diversidad de perspectivas y experiencias, fomentando un entorno de colaboración donde cada voz sea escuchada y respetada.<br /><br />
Excelencia y profesionalismo: Nos esforzamos por alcanzar la excelencia en todo lo que hacemos, manteniendo altos estándares de profesionalismo y dedicación en cada proyecto que emprendemos.</p>
            </form>
          </div>); ;
      case "Nuevo Libro":
        return <AddBook />;

      case "Pedidos":
        return < AddOrder />;
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
        return <ProfileConfig />;
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