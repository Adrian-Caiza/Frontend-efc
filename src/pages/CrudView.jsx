import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import GenericTable from '../components/shared/GenericTable';
import GenericModal from '../components/shared/GenericModal';
import apiService from '../services/apiService';

// Ahora recibimos las columnas y los campos del formulario como propiedades
const CrudView = ({ moduleName, endpointName, tableColumns, formFields }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Usuario';
  const userImage = localStorage.getItem('userImage'); 

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const fetchData = async () => {
    try {
      const result = await apiService.getAll(endpointName);
      setData(result);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpointName]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    navigate('/login');
  };

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
        fetchData(); 
      } catch (error) {
        console.error("Error eliminando:", error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      // 1. Limpiamos y formateamos los datos antes de enviarlos
      const payloadLimpio = {
        ...formData,
        // Forzamos a que el límite de créditos sea un número real, no un string
        limiteCreditos: formData.limiteCreditos ? Number(formData.limiteCreditos) : 0,
        // Nos aseguramos de enviar la imagen vacía para que el backend no se enoje
        imgBase64: formData.imgBase64 || "" 
      };

      console.log("JSON exacto que se envía al backend:", payloadLimpio);

      if (currentRecord) {
        // ACTUALIZAR
        const updatePayload = { ...payloadLimpio, id: currentRecord.id };
        await apiService.update(endpointName, updatePayload);
      } else {
        // CREAR
        await apiService.create(endpointName, payloadLimpio);
      }
      
      setIsModalOpen(false); 
      fetchData();           
    } catch (error) {
      console.error("Error guardando:", error);
      
      // Truco PRO: Mostrar el mensaje de error exacto que envía el backend
      if (error.response && error.response.data) {
        alert(`El servidor rechazó los datos: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("Error al guardar el registro.");
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* MENÚ DE NAVEGACIÓN */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '15px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
        <Link to="/materias" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#007bff' }}>📚 Materias</Link>
        <Link to="/estudiantes" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#007bff' }}>🎓 Estudiantes</Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {userImage && (
            <img src={`data:image/png;base64,${userImage}`} alt="Perfil" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ccc' }} />
          )}
          <h2 style={{ margin: 0 }}>Bienvenido - {userName}</h2>
        </div>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
          Salir del sistema
        </button>
      </div>
      <hr style={{ margin: '20px 0' }} />
      
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