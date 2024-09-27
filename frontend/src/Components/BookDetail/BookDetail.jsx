import React from 'react';

const BookDetail = ({ book, onBack }) => {
  if (!book) return <p>No se encontró el libro.</p>;

  return (
    <div>
      <button onClick={onBack}>Volver</button> {/* Botón para volver al carrusel */}
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <img src={book.img} alt={book.title} />
    </div>
  );
};

export default BookDetail;
