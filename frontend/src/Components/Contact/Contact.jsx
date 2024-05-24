import React from 'react';
import './Contact.css'; 
const Contact = () => {
  return (
    <div className="contact-us">
      <div className="contact-header">
        <img src="/Icono de la empresa.png" alt="Logo Textos Escolares, S.A." className="contact-logo" />
      </div>
      <div className="contact-body">
        <p className="contact-item"><img src="/icons/location-icon.png" alt="" className="contact-icon"/> 7a calle 3-24, final Calzada La Paz, Interbodegas, ofibodega 12, zona 18, ciudad de Guatemala</p>
        <p className="contact-item"><img src="/icons/email-icon.png" alt="" className="contact-icon"/> info@textosescolares.com.gt</p>
        <p className="contact-item"><img src="/icons/phone-icon.png" alt="" className="contact-icon"/> 2426-3535, 5962-2379</p>
        <p className="contact-item"><img src="/icons/web-icon.png" alt="" className="contact-icon"/> www.textosescolares.com.gt</p>
      </div>
    </div>
  );
}

export default Contact;
