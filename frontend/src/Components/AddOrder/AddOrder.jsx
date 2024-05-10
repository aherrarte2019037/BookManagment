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
        <div className="order-form">
          <h2>Pedido</h2>
          <form onSubmit={handleOrderSubmit}>
            <label htmlFor="tituloSolicitar">Título a solicitar</label>
            <input value={orderFormData.titulo} onChange={handleOrderChange} type="text" id="tituloSolicitar" name="titulo" placeholder="Ingrese el título a solicitar" />
    
            <label htmlFor="cantidad">Cantidad</label>
            <input value={orderFormData.cantidad} onChange={handleOrderChange} type="text" id="cantidad" name="cantidad" placeholder="Ingrese la cantidad" />
    
            <label htmlFor="nombreSolicitante">Nombre de colegio o distribuidor que lo solicita</label>
            <input value={orderFormData.cliente} onChange={handleOrderChange} type="text" id="nombreSolicitante" name="cliente" placeholder="Ingrese el nombre de colegio o distribuidor" />
    
            <button type="submit">Enviar Pedido</button>
          </form>
    
          <h2>Orden De Compra</h2>
          <form>
            <label htmlFor="temporada">Temporada</label>
            <input type="text" id="temporada" name="temporada" placeholder="Ingrese la temporada" />
    
            <label htmlFor="vendedor">Vendedor</label>
            <input type="text" id="vendedor" name="vendedor" placeholder="Ingrese el vendedor" />
    
            <label htmlFor="fecha">Fecha</label>
            <input type="text" id="fecha" name="fecha" placeholder="Ingrese la fecha" />
    
            <label htmlFor="entrega">Entrega</label>
            <input type="text" id="entrega" name="entrega" placeholder="Ingrese la entrega" />
    
            <label htmlFor="detalleCompra">Detalle De la compra</label>
            <textarea id="detalleCompra" name="detalleCompra" placeholder="Ingrese el detalle de la compra"></textarea>
    
            <button type="submit">Confirmar Orden</button>
          </form>
        </div>
      );
    }
    