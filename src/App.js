
import DataTable from './datatable/DataTable';

function App() {
  const appStyle = {
    backgroundColor: '#2C2C2C', // Fondo del dashboard
    color: '#EAEAEA', // Color del texto principal
    fontFamily: 'Roboto, Arial, sans-serif', // Tipo de letra
    padding: '20px',
    minHeight: '100vh', // Para ocupar todo el alto de la pantalla
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#1ab69d', // Color del título
    fontSize: '2.5rem', // Tamaño del texto del título
    marginBottom: '20px', // Espaciado inferior
  };

  const containerStyle = {
    backgroundColor: '#3A3A3A', // Fondo del contenedor
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Sombra sutil
  };
  return (
    <div style={appStyle}>
      <h1 style={titleStyle}>Dashboard de Análisis de Datos</h1>
      <div style={containerStyle}>
        <DataTable />
      </div>
    </div>
  );
}

export default App;
