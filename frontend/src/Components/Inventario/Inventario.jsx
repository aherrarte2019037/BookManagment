import React, { useState, useEffect } from 'react';
import './Inventario.css'; // Asegúrate de tener este archivo en tu proyecto

export default function Inventario() {
    const [items, setItems] = useState([]);
    const [existencias, setExistencias] = useState([]);

    // Simulación de carga de datos
    useEffect(() => {
        // Aquí iría la llamada a la API o base de datos para los libros
        setItems([
            { id: 1, nombre: 'MATE' },
            { id: 2, nombre: 'LENGUAJE' },
            { id: 3, nombre: 'Sociales' }
        ]);

        // Aquí iría la llamada a la API o base de datos para las existencias
        setExistencias([
            { libroId: 1, fecha: '20/03/24', usuario: 'Emilio', cantidad: 100 },
            { libroId: 1, fecha: '31/07/14', usuario: 'Alicia', cantidad: -10 }
        ]);
    }, []);

    // Calcular el total de existencias
    const totalExistencias = existencias.reduce((total, existencia) => total + existencia.cantidad, 0);

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
                            <td>{item.nombre}</td>
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
                        <tr key={`${existencia.libroId}-${existencia.fecha}`}>
                            <td>{existencia.libroId}</td>
                            <td>{existencia.fecha}</td>
                            <td>{existencia.usuario}</td>
                            <td>{existencia.cantidad}</td>
                        </tr>
                    ))}
                    <tr className="total-row">
                        <td colSpan="3">Total</td>
                        <td>{totalExistencias}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
