import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';

const GenericModal = ({ isOpen, onClose, onSubmit, title, fields, initialData }) => {
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({});
  const [optionsData, setOptionsData] = useState({});

  // Cada vez que se abre el modal o cambian los datos iniciales (para editar), actualizamos el estado
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Si no hay datos iniciales (es decir, estamos creando), limpiamos el formulario
      const emptyForm = {};
      fields.forEach(field => emptyForm[field.name] = field.type === 'multi-select' ? [] : '');
      setFormData(emptyForm);
    }
  }, [initialData, fields, isOpen]);

  // NUEVO: Cuando se abre el modal, busca los datos relacionales si el campo lo requiere
  useEffect(() => {
    const loadOptions = async () => {
      if (!isOpen) return;
      const newOptions = {};
      for (const field of fields) {
        if (field.apiOptions) {
          try {
            const data = await apiService.getAll(field.apiOptions);
            newOptions[field.name] = data;
          } catch (e) {
            console.error(`Error cargando opciones de ${field.apiOptions}`, e);
          }
        }
      }
      setOptionsData(newOptions);
    };
    loadOptions();
  }, [isOpen, fields]);

  // Manejador genérico para cuando el usuario escribe en cualquier input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // NUEVO: Manejador especial para el multi-select (Materias)
  const handleMultiSelect = (e, fieldName) => {
    const values = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData(prev => ({ ...prev, [fieldName]: values }));
  };

  // NUEVA FUNCIÓN: Transforma la imagen a Base64
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Obtenemos el resultado y separamos la metadata del código Base64 puro
        const base64String = reader.result.split(',')[1];
        setFormData(prev => ({ ...prev, [fieldName]: base64String }));
      };
      // Esto dispara el proceso de lectura
      reader.readAsDataURL(file);
    }
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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {fields.map((field, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>{field.label}:</label>
              
              {field.type === 'file' ? (
                <div>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, field.name)} required={field.required && !formData[field.name]} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  {formData[field.name] && <img src={`data:image/png;base64,${formData[field.name]}`} alt="Preview" style={{ marginTop: '10px', width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />}
                </div>
              ) : field.type === 'select' ? (
                // NUEVO: Select para un solo elemento (Estudiantes)
                <select name={field.name} value={formData[field.name] || ''} onChange={handleChange} required={field.required} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <option value="">Seleccione...</option>
                  {optionsData[field.name]?.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.nombre} {opt.apellido || ''} {opt.identificacion ? `(${opt.identificacion})` : ''}</option>
                  ))}
                </select>
              ) : field.type === 'multi-select' ? (
                // NUEVO: Multi-Select para varios elementos (Materias)
                <select multiple name={field.name} value={formData[field.name] || []} onChange={(e) => handleMultiSelect(e, field.name)} required={field.required} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '100px' }}>
                  {optionsData[field.name]?.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.nombre} ({opt.codigo || opt.id})</option>
                  ))}
                </select>
              ) : (
                <input type={field.type || 'text'} name={field.name} value={formData[field.name] || ''} onChange={handleChange} required={field.required} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              )}
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>Cancelar</button>
            <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericModal;