import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Verificamos si existe un token o dato de sesión guardado
  const isAuthenticated = localStorage.getItem('userToken');

  // Si no hay sesión, lo enviamos de vuelta al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza la ruta solicitada (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;