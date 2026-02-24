import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericTable from '../components/shared/GenericTable';
import GenericModal from '../components/shared/GenericModal';
import apiService from '../services/apiService';

// Recibimos el nombre visual ("Materias") y el endpoint de la API ("materias")
const CrudView = ({ moduleName, endpointName }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Usuario';

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // --- CARGA INICIAL DE DATOS ---
  const fetchData = async () => {
    try {
      const result = await apiService.getAll(endpointName);
      setData(result);
    } catch (error) {
      console.error("Error cargando datos:", error);
      alert("Hubo un error al cargar los datos. Revisa la consola.");
    }
  };

  // Se ejecuta automáticamente al cargar el componente
  useEffect(() => {
    fetchData();
  }, [endpointName]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  // --- CONFIGURACIÓN PARA MATERIAS ---
  // Según tu TXT, una materia tiene: id, nombre, codigo, descripcion, creditos
  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'codigo', label: 'Código' },
    { key: 'nombre', label: 'Nombre' }
  ];

  const formFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'codigo', label: 'Código', type: 'text', required: true },
    { name: 'descripcion', label: 'Descripción', type: 'text', required: true },
    { name: 'creditos', label: 'Créditos', type: 'number', required: true }
  ];

  // --- MANEJADORES DE ACCIONES ---
  const handleCreateNew = () => {
    setCurrentRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setCurrentRecord(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await apiService.delete(endpointName, id);
        fetchData(); // Recargamos la tabla tras eliminar
      } catch (error) {
        console.error("Error eliminando:", error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentRecord) {
        // ACTUALIZAR (Tu compañero pide el ID dentro del JSON)
        const updatePayload = { ...formData, id: currentRecord.id };
        await apiService.update(endpointName, updatePayload);
      } else {
        // CREAR
        await apiService.create(endpointName, formData);
      }
      setIsModalOpen(false); // Cerramos el modal
      fetchData();           // Recargamos la tabla para ver los cambios
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Error al guardar el registro.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Bienvenido - {userName}</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
          Salir del sistema
        </button>
      </div>
      <hr style={{ marginBottom: '20px' }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Gestión de {moduleName}</h3>
        <button onClick={handleCreateNew} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          + Nuevo Registro
        </button>
      </div>

      <GenericTable columns={tableColumns} data={data} onEdit={handleEdit} onDelete={handleDelete} />

      <GenericModal 
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit} title={currentRecord ? `Editar ${moduleName}` : `Crear ${moduleName}`}
        fields={formFields} initialData={currentRecord}
      />
    </div>
  );
};

export default CrudView;