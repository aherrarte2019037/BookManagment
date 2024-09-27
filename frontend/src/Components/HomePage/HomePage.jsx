import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = ({ onChangeContent }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: '1', img: 'https://www.recreoviral.com/wp-content/uploads/2015/06/30-asombrosas-portadas-de-libros-28.jpg', title: 'The brothers and sisters', description: 'Descripción del Libro 1' },
    { id: '2', img: 'https://static-cse.canva.com/blob/439109/1024w-qIvQK6RTXxg.jpg', title: 'El quinto infierno', description: 'Descripción del Libro 2' },
    { id: '3', img: 'https://th.bing.com/th/id/R.3dd6fd378b12bf90994df4b6272b5bc2?rik=tNWvRE0Xuu4vzA&pid=ImgRaw&r=0', title: 'Portadas de libros para niños', description: 'Descripción del Libro 3' },
    { id: '4', img: 'https://th.bing.com/th/id/R.c38f78f6c39989eb43a17c45ecf9c7ea?rik=HIgltDK2zttPKg&pid=ImgRaw&r=0', title: 'Las leyendas de la tierra límite', description: 'Descripción del Libro 4' },
  ];

  const slideWidth = 270;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [slides.length]);

  const getCarouselTransform = () => {
    const offset = (window.innerWidth / 2) - (slideWidth / 2); // Cálculo para centrar la imagen
    return `translateX(${offset - currentSlide * slideWidth}px)`;
  };

  const getSlideClass = (index) => {
    if (index === currentSlide) return 'active';
    if (index === (currentSlide - 1 + slides.length) % slides.length) return 'prev';
    if (index === (currentSlide + 1) % slides.length) return 'next';
    return '';
  };

  const handleImageClick = (book) => {
    onChangeContent('BookDetail', book); // Abre en una nueva pestaña
  };

  return (
    <>
      <div className="homepage">
        <div className="carousel-container">
          <div className="carousel" >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-slide ${getSlideClass(index)}`} // Añade clase 'active' si es la diapositiva actual
                style={{ backgroundImage: `url(${slide.img})` }}
                onClick={() => handleImageClick(slide)} 
              ></div>
            ))}

            <button onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}>Anterior</button>
            <button onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}>Siguiente</button>

          </div>
        </div>
      </div>

      <div className="new-book-form">
        <b><h1>Información General</h1></b>
        <form>
          <label htmlFor="editorial">¿Quiénes somos?</label>
          <p>La Editorial Textos Escolares es una empresa guatemalteca líder en la producción y distribución de materiales educativos. Su enfoque en la innovación y la calidad la ha posicionado como un referente en el sector editorial. Con valores de ética, colaboración y compromiso social, la empresa busca contribuir al desarrollo integral de las comunidades educativas. Su visión es expandirse a nivel nacional e internacional, manteniendo su pasión por la educación y la mejora continua.</p>
          
          <label htmlFor="editorial">Misión</label>
          <p>Facilitar el acceso a una educación de calidad mediante la producción y distribución de materiales educativos innovadores y relevantes, comprometiéndonos con la excelencia en cada etapa de nuestro trabajo, desde la creación hasta la entrega final, para contribuir al desarrollo integral de las comunidades educativas.</p>
          
          <label htmlFor="editorial">Visión</label>
          <p>Nuestra visión es dejar una huella indeleble en la experiencia de conocimiento en los estudiantes, que sientan los libros de texto como un apoyo, un amigo de aprendizaje, donde puedan encontrar todo un mundo de conocimiento y experiencias, que los invite a querer aprender más, a experimentar en su propia vida las diferentes áreas que se puedan presentar.</p>
          
          <label htmlFor="editorial">Valores</label>
          <p>Compromiso con la calidad educativa: Nos comprometemos a ofrecer materiales educativos de alta calidad que promuevan el aprendizaje significativo y el desarrollo integral de los estudiantes.<br /><br />
            Innovación constante: Buscamos constantemente nuevas formas de mejorar y adaptarnos a las necesidades cambiantes de las comunidades educativas, impulsando la innovación en cada aspecto de nuestro trabajo.<br /><br />
            Ética y responsabilidad: Actuamos con integridad y responsabilidad en todas nuestras acciones, manteniendo altos estándares éticos en nuestras relaciones con empleados, autores, clientes y proveedores.<br /><br />
            Colaboración y diversidad: Valoramos la diversidad de perspectivas y experiencias, fomentando un entorno de colaboración donde cada voz sea escuchada y respetada.<br /><br />
            Excelencia y profesionalismo: Nos esforzamos por alcanzar la excelencia en todo lo que hacemos, manteniendo altos estándares de profesionalismo y dedicación en cada proyecto que emprendemos.</p>
        
        </form>
      </div>
    </>
  );
};

export default HomePage;

