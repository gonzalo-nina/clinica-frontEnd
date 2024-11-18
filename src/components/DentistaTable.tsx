import React from 'react';
import { Dentista } from '../types';

interface DentistaTableProps {
    dentistas: Dentista[];
    onEdit: (dentista: Dentista) => void;
    onDelete: (id: number) => void;
}

const DentistaTable: React.FC<DentistaTableProps> = ({ dentistas, onEdit, onDelete }) => {
    return (
        <table
            border={1}
            cellPadding={10}
            cellSpacing={0}
            style={{ width: '100%', textAlign: 'center' }}
        >
            <thead>
                <tr>
                    <th style={{ width: '5%' }}>ID</th>
                    <th style={{ width: '23%' }}>Nombre</th>
                    <th style={{ width: '23%' }}>Apellido</th>
                    <th style={{ width: '23%' }}>Especialidad</th>
                    <th style={{ width: '20%' }}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {dentistas.map((dentista) => (
                    <tr key={dentista.id}>
                        <td>{dentista.id}</td>
                        <td>{dentista.nombre}</td>
                        <td>{dentista.apellido}</td>
                        <td>{dentista.especialidad}</td>
                        <td>
                            <button
                                onClick={() => onEdit(dentista)}
                                className="edit-button"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(dentista.id)}
                                className="delete-button"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DentistaTable;