import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const Login = () => {
  const navigate = useNavigate();
  // Estados para capturar lo que el usuario escribe
  const [email, setEmail] = useState('prueba@correo.com'); // Dejamos tus credenciales por defecto para probar rápido
  const [password, setPassword] = useState('miPassword123');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiamos errores previos
    
    try {
      // Llamamos al backend real
      const data = await apiService.login({ email, password });
      
      const nombreFinal = data.name ? `${data.name} ${data.last}` : 'Usuario';
      
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', nombreFinal);
      
      // Entramos al sistema
      navigate('/materias'); 
    } catch (err) {
      console.error(err);
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '350px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Inicio de Sesión</h2>
      
      {/* Mostrar error si falla el login */}
      {error && <div style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ textAlign: 'left' }}>
          <label>Email:</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }} 
          />
        </div>
        <div style={{ textAlign: 'left' }}>
          <label>Clave:</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }} 
          />
        </div>
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;