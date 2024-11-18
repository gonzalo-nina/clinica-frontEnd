import React, { useState, useEffect } from 'react';
import { Dentista } from '../types';

interface DentistaFormProps {
    initialData: Omit<Dentista, 'id'>;
    onSubmit: (data: Omit<Dentista, 'id'>) => void;
    onCancel: () => void;
    isEditing?: boolean;
}

const DentistaForm: React.FC<DentistaFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    isEditing = false
}) => {
    const [nombre, setNombre] = useState(initialData?.nombre || '');
    const [apellido, setApellido] = useState(initialData?.apellido || '');
    const [especialidad, setEspecialidad] = useState(initialData?.especialidad || '');

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.nombre);
            setApellido(initialData.apellido);
            setEspecialidad(initialData.especialidad);
        } else {
            setNombre('');
            setApellido('');
            setEspecialidad('');
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ nombre, apellido, especialidad });

        if (!isEditing) {
            setNombre('');
            setApellido('');
            setEspecialidad('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <h2>{isEditing ? 'Editar Dentista' : 'Registrar Dentista'}</h2>
            <div>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    style={{ marginBottom: '10px', marginRight: '10px' }}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    style={{ marginBottom: '10px', marginRight: '10px' }}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Especialidad"
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                    required
                    style={{ marginBottom: '10px', marginRight: '10px' }}
                />
            </div>
            <button type="submit">
                {isEditing ? 'Guardar Cambios' : 'Registrar'}
            </button>
            {onCancel && (
                <button
                    type="button"
                    onClick={onCancel}
                    className="cancel-button"
                    style={{ marginLeft: '10px' }}
                >
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default DentistaForm;