import React, { useState } from "react";
import './HomePage.css';

export default function HomePage() {
   
    return (
        <div className="new-book-form">
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
          </div>
    );
}
