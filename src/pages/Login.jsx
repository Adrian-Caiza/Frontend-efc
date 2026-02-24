import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Aquí es donde luego harás el POST al endpoint de tu compañero.
    // Si falla, debes mostrar la alerta: "Usuario o contraseña incorrectos."
    
    // Por ahora simulamos un login exitoso guardando un token falso:
    localStorage.setItem('userToken', 'token-generico-123');
    localStorage.setItem('userName', 'Estudiante Administrador'); // Para el mensaje de bienvenida
    
    navigate('/'); // Redirigimos a la vista principal
  };

  return (
    <div style={{ padding: '50px', maxWidth: '350px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ textAlign: 'left' }}>
          <label>Email:</label>
          <input type="email" required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <label>Clave:</label>
          <input type="password" required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;