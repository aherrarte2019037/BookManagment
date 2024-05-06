import React, { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from '../../Utils/supabase';

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
        <div className="new-book-form">
            <h2>Nuevo Libro</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="editorial">Editorial</label>
                <input value={formData.editorial} onChange={handleChange} type="text" id="editorial" name="editorial" placeholder="Ingresa la editorial" />

                <label htmlFor="titulo">Título del Libro</label>
                <input value={formData.titulo} onChange={handleChange} type="text" id="titulo" name="titulo" placeholder="Ingresa el título del libro" />

                <label htmlFor="precio">Precio de Venta (Q)</label>
                <input value={formData.precio} onChange={handleChange} type="text" id="precio" name="precio" placeholder="Ingresa el precio de venta" />

                <label htmlFor="cantidad">Cantidad</label>
                <input value={formData.cantidad} onChange={handleChange} type="text" id="cantidad" name="cantidad" placeholder="Ingresa la cantidad" />

                <button type="submit">Agregar Libro</button>
            </form>
        </div>
    );
}