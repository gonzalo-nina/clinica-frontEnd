import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dentista } from './types';
import DentistaForm from './components/DentistaForm';
import DentistaTable from './components/DentistaTable';

const App: React.FC = () => {
    const [dentistas, setDentistas] = useState<Dentista[]>([]);
    const [selectedDentista, setSelectedDentista] = useState<Dentista | null>(null);
    const [error, setError] = useState<string | null>(null);
    const API_URL = '/api/dentistas';

    useEffect(() => {
        fetchDentistas();
    }, []);

    const fetchDentistas = async () => {
        try {
            const response = await axios.get(API_URL);
            setDentistas(response.data);
            setError(null);
        } catch (err) {
            setError('Error al obtener los dentistas');
            console.error(err);
        }
    };

    const handleCreate = async (dentista: Omit<Dentista, 'id'>) => {
        try {
            await axios.post(API_URL, dentista);
            fetchDentistas();
            setError(null);
        } catch (err) {
            setError('Error al crear el dentista');
            console.error(err);
        }
    };

    const handleUpdate = async (dentista: Omit<Dentista, 'id'>) => {
        if (!selectedDentista) return;
        try {
            await axios.put(`${API_URL}/${selectedDentista.id}`, dentista);
            fetchDentistas();
            setSelectedDentista(null);
            setError(null);
        } catch (err) {
            setError('Error al actualizar el dentista');
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchDentistas();
            setError(null);
        } catch (err) {
            setError('Error al eliminar el dentista');
            console.error(err);
        }
    };

    const handleSubmit = (data: Omit<Dentista, 'id'>) => {
        if (selectedDentista) {
            handleUpdate(data);
        } else {
            handleCreate(data);
        }
    };

    const handleEdit = (dentista: Dentista) => {
        setSelectedDentista(dentista);
    };

    const handleCancel = () => {
        setSelectedDentista(null);
    };

    return (
      <div className="container">
          <div className="form-container">
              <h1>Gestión de Dentistas</h1>
              {error && <p className="error-message">{error}</p>}
              <DentistaForm
                  initialData={selectedDentista || { nombre: '', apellido: '', especialidad: '' }}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isEditing={!!selectedDentista}
              />
              <DentistaTable
                  dentistas={dentistas}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
              />
          </div>
      </div>
  );
};

export default App;