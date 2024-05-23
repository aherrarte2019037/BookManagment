import React, { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from '../../Utils/supabase';
import './AddBook.css';

export default function AddBook() {
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
                <h2>Nuevo Libro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            value={formData.editorial} 
                            onChange={handleChange} 
                            type="text" 
                            id="editorial" 
                            name="editorial" 
                            placeholder="Editorial" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            value={formData.titulo} 
                            onChange={handleChange} 
                            type="text" 
                            id="titulo" 
                            name="titulo" 
                            placeholder="Título del Libro" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            value={formData.precio} 
                            onChange={handleChange} 
                            type="text" 
                            id="precio" 
                            name="precio" 
                            placeholder="Precio de Venta (Q)" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            value={formData.cantidad} 
                            onChange={handleChange} 
                            type="text" 
                            id="cantidad" 
                            name="cantidad" 
                            placeholder="Cantidad" 
                        />
                    </div>
                    <button type="submit" className="cta">
                      <span>Agregar Libro</span>
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
