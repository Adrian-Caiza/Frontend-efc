import { useNavigate } from 'react-router-dom';

const CrudView = ({ moduleName }) => {
  const navigate = useNavigate();
  // Recuperamos el nombre del usuario para cumplir con el requerimiento de bienvenida
  const userName = localStorage.getItem('userName') || 'Usuario';

  const handleLogout = () => {
    // Limpiamos la sesión y volvemos al login
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Mensaje de bienvenida obligatorio según la guía */}
      <h2>Bienvenido - {userName}</h2>
      <hr />
      
      <h3>Gestión de {moduleName}</h3>
      <p>Aquí irá la GenericTable más adelante...</p>
      
      <button onClick={handleLogout} style={{ marginTop: '30px', padding: '8px', cursor: 'pointer' }}>
        Salir del sistema
      </button>
    </div>
  );
};

export default CrudView;