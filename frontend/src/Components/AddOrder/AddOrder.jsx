import React, { useState } from 'react';
import './AddOrder.css';

export default function AddOrder() {
    const [formData, setFormData] = useState({
        titulo: '',
        cantidad: '',
        colegio: '',
        ordenCompra: '',
        temporada: '',
        vendedor: '',
        fecha: '',
        entrega: '',
        detalleCompra: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementa la lógica para procesar la orden aquí
        console.log(formData);
        alert('Orden confirmada');
    };

    return (
        <div className="form-container">
            <div className="new-book-form">
                <h2>Agregar Orden</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Título a solicitar</label>
                        <input className="input" type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Cantidad</label>
                        <input className="input" type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Nombre de colegio o distribuidor que lo solicita</label>
                        <input className="input" type="text" name="colegio" value={formData.colegio} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Orden De Compra</label>
                        <input className="input" type="text" name="ordenCompra" value={formData.ordenCompra} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Temporada</label>
                        <input className="input" type="text" name="temporada" value={formData.temporada} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Vendedor</label>
                        <input className="input" type="text" name="vendedor" value={formData.vendedor} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Fecha</label>
                        <input className="input" type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Entrega</label>
                        <input className="input" type="text" name="entrega" value={formData.entrega} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Detalle De la compra</label>
                        <textarea className="input" name="detalleCompra" value={formData.detalleCompra} onChange={handleChange} />
                    </div>
                    <button type="submit" className="cta">
                        <span>Agregar Orden</span>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <polyline points="6 12 10 16 18 8"></polyline>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
