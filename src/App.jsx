import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CrudView from './pages/CrudView';
import ProtectedRoute from './components/shared/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Cualquiera puede ver el Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas: Solo pasan si ProtectedRoute lo permite */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/modulo1" replace />} />
          
          {/* El día del examen, cambias los nombres de las rutas y del moduleName según el caso */}
          <Route path="/modulo1" element={<CrudView moduleName="Módulo 1 (ej. Estudiantes/Clientes)" />} />
          <Route path="/modulo2" element={<CrudView moduleName="Módulo 2 (ej. Materias/Vehículos)" />} />
          <Route path="/modulo3" element={<CrudView moduleName="Módulo 3 (ej. Matrículas/Reservas)" />} />
        </Route>

        {/* Ruta por defecto (Catch-all): Si escriben mal la URL, los manda a la raíz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;