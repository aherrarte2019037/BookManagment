import React, { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from '../../Utils/supabase';
import './AddSale.css';

export default function AddSale() {
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

        const { data: foundBook, error: foundBookError } = await supabase.from('Books').select().filter('title', 'ilike', formData.titulo.trim()).maybeSingle();

        if (foundBook || foundBookError) {
            toast.error('Ya existe un libro con ese título');
            return;
        }

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

    return (
        <div className="new-book-form-container">
            <div className="new-book-form">
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

              <button type="submit" className="cta">
                      <span>Agregar Venta</span>
                      <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </button>
            </form>
            </div>
          </div>
    );
}
