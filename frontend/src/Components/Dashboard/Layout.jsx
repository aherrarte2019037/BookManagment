import React, { useState } from 'react';
import './Layout.css';
import { supabase } from '../../Utils/supabase';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

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
  const [formData, setFormData] = useState({
    editorial: '',
    titulo: '',
    precio: '',
    cantidad: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('Books')
      .insert({
        editorial: formData.editorial,
        title: formData.titulo,
        unitPrice: formData.precio,
        quantity: formData.cantidad,
      }).select().single();

    if (error) {
      toast.error('No se pudo agregar el libro');
    }

    if (data) {
      toast.success('Libro agregado correctamente');
      setFormData({
        editorial: '',
        titulo: '',
        precio: '',
        cantidad: ''
      });
    }
  }

  const renderContent = () => {
    switch (activeContent) {
      case "Nuevo Libro":
        return (
          <div className="new-book-form">
            <h2>Nuevo Libro</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="editorial">Editorial</label>
              <input value={formData.editorial} onChange={handleChange} type="text" id="editorial" name="editorial" placeholder="Ingresa la editorial" />

              <label htmlFor="titulo">Título del Libro</label>
              <input value={formData.titulo} onChange={handleChange} type="text" id="titulo" name="titulo" placeholder="Ingresa el título del libro" />

              <label htmlFor="precio">Precio de Venta (Q)</label>
              <input value={formData.precio} onChange={handleChange} type="text" id="precio" name="precio" placeholder="Ingresa el precio de venta" />

              <label htmlFor="cantidad">Cantidad</label>
              <input value={formData.cantidad} onChange={handleChange} type="text" id="cantidad" name="cantidad" placeholder="Ingresa la cantidad" />

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
                <input type="text" id="tituloSolicitar" placeholder="" />

                <label htmlFor="cantidad">Cantidad</label>
                <input type="text" id="cantidad" placeholder="" />

                <label htmlFor="nombreSolicitante">Nombre de colegio o distribuidor que lo solicita</label>
                <input type="text" id="nombreSolicitante" placeholder="" />

                <button type="submit">Enviar Pedido</button>
              </form>
            </div>

            <div className="custom-table">
              <h3>Orden De Compra</h3>
              <form>
                <label htmlFor="temporada">Temporada</label>
                <input type="text" id="temporada" placeholder="" />

                <label htmlFor="vendedor">Vendedor</label>
                <input type="text" id="vendedor" placeholder="" />

                <label htmlFor="fecha">Fecha</label>
                <input type="text" id="fecha" placeholder="" />

                <label htmlFor="entrega">Entrega</label>
                <input type="text" id="entrega" placeholder="" />

                <label htmlFor="detalleCompra">Detalle De la compra:</label>
                <textarea id="detalleCompra" placeholder=""></textarea>

                <button type="submit">Confirmar Orden</button>
              </form>
            </div>
          </div>
        );
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