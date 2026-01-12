import { Outlet } from 'react-router-dom';
import Navbar from '../../public/components/Navbar'; 
import Footer from '../../public/components/Footer'; 

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Aquí se cargará el Home, Login, Reservas, etc */}
        <Outlet />
      </main>

      <Footer /> 
    </div>
  );
};

export default PublicLayout;