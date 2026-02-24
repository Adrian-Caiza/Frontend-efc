import { useState, useEffect } from 'react';

const GenericModal = ({ isOpen, onClose, onSubmit, title, fields, initialData }) => {
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({});

  // Cada vez que se abre el modal o cambian los datos iniciales (para editar), actualizamos el estado
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Si no hay datos iniciales (es decir, estamos creando), limpiamos el formulario
      const emptyForm = {};
      fields.forEach(field => emptyForm[field.name] = '');
      setFormData(emptyForm);
    }
  }, [initialData, fields, isOpen]);

  // Manejador genérico para cuando el usuario escribe en cualquier input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Cuando se envía el formulario, pasamos los datos hacia arriba (a CrudView) y cerramos
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    // Fondo oscuro semi-transparente
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      // Contenedor blanco del modal
      <div style={{
        backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
        width: '100%', maxWidth: '500px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Iteramos sobre la configuración de los campos para crear los inputs dinámicamente */}
          {fields.map((field, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>{field.label}:</label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
              Cancelar
            </button>
            <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericModal;