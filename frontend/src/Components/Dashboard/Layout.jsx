import React from 'react';
import './layout.css';

const Sidebar = () => (
  <div className="sidebar">
    Sidebar
  </div>
);

const Navbar = () => (
  <div className="navbar">
    Navbar
);

const Content = () => (
    <div className="content">
      Content
    <div>
  );
  
  const Layout = () => {
    return (
      <div className="layout">
        <sidebar />
        <div className="main">
          <Navbar />
          <Content />
        </div>
      </div>
    )
  }
 