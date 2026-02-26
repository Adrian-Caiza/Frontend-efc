import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CrudView from './pages/CrudView';
import ProtectedRoute from './components/shared/ProtectedRoute';


const materiasColumns = [
  { key: 'id', label: 'ID' },
  { key: 'codigo', label: 'Código' },
  { key: 'nombre', label: 'Nombre' }
];

const materiasFields = [
  
  { name: 'nombre', label: 'Nombre', type: 'text', required: true, pattern: "^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\\s]+$", title: "El nombre solo puede contener letras, números y espacios." },
  
  { name: 'codigo', label: 'Código', type: 'text', required: true, pattern: "^[A-Za-z0-9-]+$", title: "El código no debe contener espacios (ej. PROG-101)." },
  { name: 'descripcion', label: 'Descripción', type: 'text', required: true },
  
  { name: 'creditos', label: 'Créditos', type: 'number', required: true, min: 1, max: 10, title: "Los créditos deben ser un número entre 1 y 10." }
];


const estudiantesColumns = [
  { key: 'imgBase64', label: 'Foto', isImage: true },
  { key: 'identificacion', label: 'Identificación' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'apellido', label: 'Apellido' },
  { key: 'mail', label: 'Correo' }
];

const estudiantesFields = [
  { name: 'imgBase64', label: 'Foto de Perfil', type: 'file', required: false },
  
  
  { name: 'identificacion', label: 'Ident.', type: 'text', required: true, pattern: "^[0-9]{10}$", title: "La cédula debe tener exactamente 10 números." },
  
 
  { name: 'nombre', label: 'Nombre', type: 'text', required: true, pattern: "^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$", title: "El nombre solo puede contener letras y espacios." },
  { name: 'apellido', label: 'Apellido', type: 'text', required: true, pattern: "^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$", title: "El apellido solo puede contener letras y espacios." },
  
  { name: 'fechaNacimiento', label: 'F. Nacimiento', type: 'date', required: true },
  { name: 'ciudad', label: 'Ciudad', type: 'text', required: true, pattern: "^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$", title: "La ciudad solo puede contener letras." },
  { name: 'direccion', label: 'Dirección', type: 'text', required: true },
  
 
  { name: 'telefono', label: 'Teléfono', type: 'text', required: true, pattern: "^09[0-9]{8}$", title: "El teléfono debe empezar con 09 y tener exactamente 10 dígitos." },
  

  { name: 'mail', label: 'Correo', type: 'email', required: true, title: "Debe ingresar un correo electrónico válido." },
  
 
  { name: 'limiteCreditos', label: 'Créditos', type: 'number', required: true, min: 1, max: 40, title: "El límite de créditos debe estar entre 1 y 40." }
];


const matriculasColumns = [
  { key: 'identificacion', label: 'Cédula' },
  { key: 'estudianteNombre', label: 'Estudiante' },
  { key: 'materiasInscritas', label: 'Materia' }, 
  { key: 'totalCreditos', label: 'Créditos' }
];

const matriculasFields = [
  
  { name: 'codigo', label: 'Código', type: 'text', required: true, pattern: "^[A-Za-z0-9-]+$", title: "El código no debe contener espacios (ej. MAT-2026)." },
  { name: 'descripcion', label: 'Descripción', type: 'text', required: true },
  { name: 'estudianteId', label: 'Seleccionar Estudiante', type: 'select', apiOptions: 'estudiantes', required: true },
  { name: 'materiasIds', label: 'Materias (Mantén Ctrl/Cmd para elegir varias)', type: 'multi-select', apiOptions: 'materias', required: true }
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/materias" replace />} />
          
          <Route path="/materias" element={
            <CrudView moduleName="Materias" endpointName="materias" tableColumns={materiasColumns} formFields={materiasFields} />
          } />
          
          <Route path="/estudiantes" element={
            <CrudView moduleName="Estudiantes" endpointName="estudiantes" tableColumns={estudiantesColumns} formFields={estudiantesFields} />
          } />

          <Route path="/matriculas" element={
            <CrudView moduleName="Matrículas" endpointName="matriculas" tableColumns={matriculasColumns} formFields={matriculasFields} hideEdit={true} />
          } />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;