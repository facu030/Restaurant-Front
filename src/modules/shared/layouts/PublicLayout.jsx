import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar'; // Descomentar cuando lo tengas arreglado
// import Footer from '../components/Footer'; // Descomentar cuando lo tengas arreglado

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Temporal */}
      <nav className="bg-gray-800 text-white p-4">
        Navegación Pública
      </nav>

      <main className="flex-grow">
        {/* Aquí se cargará el Home, Login, etc */}
        <Outlet />
      </main>

      {/* Footer Temporal */}
      <footer className="bg-gray-200 text-center p-4">
        Pie de página
      </footer>
    </div>
  );
};

export default PublicLayout;