import React from 'react';
import './Layout.css';

const Sidebar = () => (
  <div className="sidebar">
    Sidebar
  </div>
);

const Navbar = () => (
  <div className="navbar">
    Navbar
  </div>
);

const Content = () => (
  <div className="content">
    Content
  </div>
);

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}

export default Layout;
