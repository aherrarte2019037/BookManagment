import React from 'react';
import './BookDetail.css'; // Archivo CSS para los estilos

const BookDetail = ({ book, onBack }) => {
  if (!book) return <p>No se encontró el libro.</p>;

  return (
    <div className="book-detail-container">
      {/* Botón de regresar */}
      <button className="back-button" onClick={onBack}>
        <div className="back-button-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height="25px"
            width="25px"
          >
            <path
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              fill="#000000"
            ></path>
            <path
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              fill="#000000"
            ></path>
          </svg>
        </div>
        <p className="back-button-text">Regresar</p>
      </button>

      {/* Contenido del libro */}
      <div className="book-content">
        {/* Portada del libro */}
        <div className="book-image-container">
          <img src={book.img} alt={book.title} className="book-image" />
        </div>

        {/* Agrupar título y descripción */}
        <div className="book-info-container">
          {/* Título del libro */}
          <h1 className="book-title">{book.title}</h1>

          {/* Descripción del libro */}
          <div className="book-description-container">
            <p className="book-description">{book.description}</p>
          </div>
        </div>

        {/* Información adicional: cantidad disponible y precio */}
        <div className="book-info">
          <div className="book-info-item">
            <span className="info-label">Cantidad disponible:</span>
            <span className="info-value">{book.stock}</span>
          </div>
          <div className="book-info-item">
            <span className="info-label">Precio del libro:</span>
            <span className="info-value">${book.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

