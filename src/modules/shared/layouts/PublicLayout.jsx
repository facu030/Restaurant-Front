import { Outlet } from 'react-router-dom';
import Navbar from '../../public/components/Navbar'; 


const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Aquí se cargará el Home, Login, etc */}
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center p-4">
        Pie de página
      </footer>
    </div>
  );
};

export default PublicLayout;