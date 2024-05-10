import React, { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from '../../Utils/supabase';

export default function AddOrder() {
    const [orderFormData, setOrderFormData] = useState({
        titulo: '',
        cantidad: '',
        cliente: '',
    });

    const handleOrderChange = (e) => {
        const { name, value } = e.target;
        setOrderFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleOrderSubmit(e) {
        e.preventDefault();

        const { data, error } = await supabase.from('Books').select().filter('title', 'ilike', orderFormData.titulo.trim()).maybeSingle();
        if (error || !data) {
            toast.error('No se encontró el libro');
            return;
        }

        if (data.quantity < orderFormData.cantidad) {
            toast.error('No hay suficientes libros en existencia');
            return;
        }

        const { data: orderData, error: orderError } = await supabase.from('Orders').insert({
            book_id: data.id,
            quantity: orderFormData.cantidad,
            client: orderFormData.cliente,
        }).select().single();

        if (orderError) {
            toast.error('Error al crear el pedido');
            return;
        }

        if (orderData) {
            toast.success('Pedido creado');
            await supabase.from('Books').update({ quantity: data.quantity - orderFormData.cantidad }).eq('id', data.id);
        }
    }
    
    return (
        <div className="form-container">
            <div className="custom-table">
                <h3>Pedido</h3>
                <form onSubmit={handleOrderSubmit}>
                    <label htmlFor="tituloSolicitar">Título a solicitar</label>
                    <input value={orderFormData.titulo} onChange={handleOrderChange} type="text" id="tituloSolicitar" name="titulo" placeholder="" />

                    <label htmlFor="cantidad">Cantidad</label>
                    <input value={orderFormData.cantidad} onChange={handleOrderChange} type="text" id="cantidad" name="cantidad" placeholder="" />

                    <label htmlFor="nombreSolicitante">Nombre de colegio o distribuidor que lo solicita</label>
                    <input value={orderFormData.cliente} onChange={handleOrderChange} type="text" id="nombreSolicitante" name="cliente" placeholder="" />

                    <button type="submit">Enviar Pedido</button>
                </form>
            </div>

            <div className="custom-table">
                <h3>Orden De Compra</h3>
                <form>
                    <label htmlFor="temporada">Temporada</label>
                    <input type="text" id="temporada" placeholder="" />

                    <label htmlFor="vendedor">Vendedor</label>
                    <input type="text" id="vendedor" placeholder="" />

                    <label htmlFor="fecha">Fecha</label>
                    <input type="text" id="fecha" placeholder="" />

                    <label htmlFor="entrega">Entrega</label>
                    <input type="text" id="entrega" placeholder="" />

                    <label htmlFor="detalleCompra">Detalle De la compra:</label>
                    <textarea id="detalleCompra" placeholder=""></textarea>

                    <button type="submit">Confirmar Orden</button>
                </form>
            </div>
        </div>
    );
}
