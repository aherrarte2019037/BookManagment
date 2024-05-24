import React, { useState } from 'react';
import './AddOrder.css'; // Importa tus estilos CSS

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
            <h2>Pedido</h2>
            <form onSubmit={handleSubmit}>
                <label className="label">Título a solicitar</label>
                <input className="input" type="text" name="titulo" value={formData.titulo} onChange={handleChange} />

                <label className="label">Cantidad</label>
                <input className="input" type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} />

                <label className="label">Nombre de colegio o distribuidor que lo solicita</label>
                <input className="input" type="text" name="colegio" value={formData.colegio} onChange={handleChange} />

                <label className="label">Orden De Compra</label>
                <input className="input" type="text" name="ordenCompra" value={formData.ordenCompra} onChange={handleChange} />

                <label className="label">Temporada</label>
                <input className="input" type="text" name="temporada" value={formData.temporada} onChange={handleChange} />

                <label className="label">Vendedor</label>
                <input className="input" type="text" name="vendedor" value={formData.vendedor} onChange={handleChange} />

                <label className="label">Fecha</label>
                <input className="input" type="date" name="fecha" value={formData.fecha} onChange={handleChange} />

                <label className="label">Entrega</label>
                <input className="input" type="text" name="entrega" value={formData.entrega} onChange={handleChange} />

                <label className="label">Detalle De la compra</label>
                <textarea className="input" name="detalleCompra" value={formData.detalleCompra} onChange={handleChange} />

                <button type="submit" className="button">Confirmar Orden</button>
            </form>
        </div>
    );
}
