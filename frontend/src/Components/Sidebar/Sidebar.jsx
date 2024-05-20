import React, { useState } from 'react';
import './Sidebar.css';
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
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <div
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div 
        className={`company-icon ${isExpanded ? 'expanded' : 'collapsed'}`}
        onClick={() => onChangeContent("Home")} // Cambiar contenido a "Home"
        style={{ cursor: 'pointer' }} // Añadir cursor pointer para indicar que es clicable
      >
        <img src="/Icono de la empresa.png" alt="Empresa" />
      </div>
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
      <SidebarButton
        icon={<img src="/icons8-settings-40.png" alt="Configuración" />}
        text="Configuración"
        onClick={() => onChangeContent("Configuración")}
        isExpanded={isExpanded}
      />
      <SidebarButton
        icon={<img src="/icons8-logout-40.png" alt="Cerrar Sesión" />}
        text="Cerrar Sesión"
        onClick={signOut}
        isExpanded={isExpanded}
      />
    </div>
  );
};

export default Sidebar;
