import React, { useState, useEffect } from 'react';
import './Inventario.css';
import { supabase } from '../../Utils/supabase';

export default function Inventario() {
    const [items, setItems] = useState([]);
    const [existencias, setExistencias] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const { data, error } = await supabase
                .from('Books')
                .select('id, title');

            if (error) console.error('Error fetching books:', error);
            else setItems(data);
        };

        const fetchExistencias = async () => {
            const { data, error } = await supabase
                .from('Inventory')
                .select('book_id, timestamp, user_fullname, quantity');

            if (error) console.error('Error fetching existencias:', error);
            else setExistencias(data);
        };

        fetchBooks();
        fetchExistencias();

    }, []);

    return (
        <div className="inventario-container">
            <h1>Inventario</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="existencias-table">
                <thead>
                    <tr>
                        <th>Libro ID</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {existencias.map(existencia => (
                        <tr key={`${existencia.book_id}-${existencia.timestamp}`}>
                            <td>{existencia.book_id}</td>
                            <td>{new Date(existencia.timestamp).toLocaleString()}</td>
                            <td>{existencia.user_fullname}</td>
                            <td>{existencia.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}