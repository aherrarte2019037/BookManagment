import React, { useState, useEffect } from 'react';
import './Inventario.css'; // Asegúrate de tener este archivo en tu proyecto

export default function Inventario() {
    const [items, setItems] = useState([]);

    // Simulación de carga de datos
    useEffect(() => {
        // Aquí iría la llamada a la API o base de datos
        setItems([
            { id: 1, nombre: 'Libro de Matemáticas', cantidad: 20 },
            { id: 2, nombre: 'Libro de Ciencias', cantidad: 15 },
            { id: 3, nombre: 'Libro de Literatura', cantidad: 10 }
        ]);
    }, []);

    return (
        <div className="inventario-container">
            <h1>Inventario</h1>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
