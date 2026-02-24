const GenericTable = ({ columns, data, onEdit, onDelete }) => {
  // Si no hay datos todavía o el arreglo está vacío, mostramos un mensaje amigable
  if (!data || data.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>No hay registros para mostrar.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
            {/* Iteramos sobre las columnas que le pasemos dinámicamente */}
            {columns.map((col, index) => (
              <th key={index} style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
                {col.label}
              </th>
            ))}
            {/* Columna fija para los botones de acción */}
            <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Iteramos sobre los datos (las filas de la base de datos) */}
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: '1px solid #ddd' }}>
              
              {/* Iteramos de nuevo sobre las columnas para sacar el valor exacto de la fila */}
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{ padding: '12px' }}>
                  {/* NUEVA LÓGICA: Si la columna está marcada como imagen, la dibujamos */}
                  {col.isImage ? (
                    row[col.key] ? (
                      <img 
                        src={`data:image/png;base64,${row[col.key]}`} 
                        alt="Foto" 
                        style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc' }} 
                      />
                    ) : (
                      <span style={{ color: '#999', fontSize: '0.9em' }}>Sin foto</span>
                    )
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
              
              {/* Botones de acción genéricos */}
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <button 
                  onClick={() => onEdit(row)} 
                  style={{ marginRight: '10px', padding: '6px 12px', cursor: 'pointer', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
                >
                  Editar
                </button>
                <button 
                  // Usamos row.id o row._id por si tu compañero usa MySQL o MongoDB
                  onClick={() => onDelete(row.id || row._id)} 
                  style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;