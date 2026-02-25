import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CrudView from './pages/CrudView';
import ProtectedRoute from './components/shared/ProtectedRoute';

// --- CONFIGURACIÓN DE MATERIAS ---
const materiasColumns = [
  { key: 'id', label: 'ID' },
  { key: 'codigo', label: 'Código' },
  { key: 'nombre', label: 'Nombre' }
];

const materiasFields = [
  { name: 'nombre', label: 'Nombre', type: 'text', required: true },
  { name: 'codigo', label: 'Código', type: 'text', required: true },
  { name: 'descripcion', label: 'Descripción', type: 'text', required: true },
  { name: 'creditos', label: 'Créditos', type: 'number', required: true }
];

// --- CONFIGURACIÓN DE ESTUDIANTES ---
const estudiantesColumns = [
  { key: 'imgBase64', label: 'Foto', isImage: true },
  { key: 'identificacion', label: 'Identificación' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'apellido', label: 'Apellido' },
  { key: 'mail', label: 'Correo' }
];

const estudiantesFields = [
  { name: 'imgBase64', label: 'Foto de Perfil', type: 'file', required: false },
  { name: 'identificacion', label: 'Ident.', type: 'text', required: true },
  { name: 'nombre', label: 'Nombre', type: 'text', required: true },
  { name: 'apellido', label: 'Apellido', type: 'text', required: true },
  { name: 'fechaNacimiento', label: 'F. Nacimiento', type: 'date', required: true },
  { name: 'ciudad', label: 'Ciudad', type: 'text', required: true },
  { name: 'direccion', label: 'Dirección', type: 'text', required: true },
  { name: 'telefono', label: 'Teléfono', type: 'text', required: true },
  { name: 'mail', label: 'Correo', type: 'email', required: true },
  { name: 'limiteCreditos', label: 'Créditos', type: 'number', required: true }
];

// --- CONFIGURACIÓN DE MATRICULAS ---
const matriculasColumns = [
  { key: 'identificacion', label: 'Cédula' },
  { key: 'estudianteNombre', label: 'Estudiante' },
  { key: 'materiasInscritas', label: 'Materia' }, 
  { key: 'totalCreditos', label: 'Créditos' }
];

const matriculasFields = [
  { name: 'codigo', label: 'Código', type: 'text', required: true },
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
          
          {/* Inyectamos la configuración de Materias */}
          <Route path="/materias" element={
            <CrudView moduleName="Materias" endpointName="materias" tableColumns={materiasColumns} formFields={materiasFields} />
          } />
          
          {/* Inyectamos la configuración de Estudiantes */}
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