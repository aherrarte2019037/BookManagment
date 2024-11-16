import React, { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from '../../Utils/supabase';
import './AddSale.css';

const InputField = ({label, name, value, onChange}) => (
    <div className="form-group">
        <label htmlFor="{name}">{label}</label>
        <input type="text" id={name} name={name} value={value} onChange={onChange}/>
    </div>
);

export default function AddSale() {
    const [formData, setFormData] = useState({
        editorial: '',
        vendedor: '',
        condiciones: '',
        fechaEntrega: '',
        establecimiento: '',
        atencion: '',
        direccion: '',
        telefono: '',
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

        toast.success('Libro agregado correctamente');
        setFormData({
            editorial: '',
            vendedor: '',
            condiciones: '',
            fechaEntrega: '',
            establecimiento: '',
            atencion: '',
            direccion: '',
            telefono: '',
            titulo: '',
            precio: '',
            cantidad: ''
        }); 
    }

    return (
        <div className="form-container">
            <div className="new-book-form">
            <h2>Nueva Venta</h2>
            <form onSubmit={handleSubmit}>
                <InputField label="Temporada" name="editorial" value={formData.editorial} onChange={handleChange}/>
                <InputField label="Vendedor" name="vendedor" value={formData.vendedor} onChange={handleChange}/>
                <InputField label="Condiciones" name="condiciones" value={formData.condiciones} onChange={handleChange}/>
                <InputField label="Fecha de entrega" name="fechaEntrega" value={formData.fechaEntrega} onChange={handleChange}/>
                <InputField label="Establecimiento" name="establecimiento" value={formData.establecimiento} onChange={handleChange}/>
                <InputField label="Atencion" name="atencion" value={formData.atencion} onChange={handleChange}/>
                <InputField label="Direccion" name="direccion" value={formData.direccion} onChange={handleChange}/>
                <InputField label="Telefono" name="telefono" value={formData.telefono} onChange={handleChange}/>
                <InputField label="Titulo" name="titulo" value={formData.titulo} onChange={handleChange}/>
                <InputField label="Precio" name="precio" value={formData.precio} onChange={handleChange}/>
                <InputField label="Cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange}/>

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
