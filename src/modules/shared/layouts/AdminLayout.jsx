import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth'; 
import Button from '../components/Button';

function AdminLayout() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { signout } = useAuth();

  const logout = () => {
    signout();
    navigate('/login');
  };

  useEffect(() => {
    document.documentElement.classList.remove('dark');

    return () => document.documentElement.classList.add('dark');
  }, []);

  const getLinkStyles = ({ isActive }) => {
    const baseClasses = "block w-full py-4 pl-4 rounded-xl transition-colors duration-200 hover:bg-gray-100";
    
    return isActive 
      ? `${baseClasses} bg-amber-100 text-amber-700 font-semibold`
      : `${baseClasses} text-gray-600`;
  };

  const renderLogoutButton = (mobile = false) => (
    <Button 
        className={`${mobile ? 'block w-full sm:hidden mt-4' : 'hidden sm:block'}`} 
        onClick={logout}
    >
        Cerrar sesión
    </Button>
  );

  return (
    <div className="h-full grid grid-cols-1 grid-rows-[auto_1fr] sm:gap-3 sm:grid-cols-[256px_1fr]">
      
      {/* HEADER */}
      <header className="flex items-center justify-between p-4 shadow rounded bg-white sm:col-span-2">
        <span className="font-bold text-lg text-gray-700">Mi Dashboard</span>
        
        {renderLogoutButton()}
        
        {/* Botón Hamburguesa Móvil */}
        <button
          className="bg-transparent border-none shadow-none text-2xl sm:hidden focus:outline-none"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <span>&#215;</span> : <span>&#9776;</span>}
        </button>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`
          absolute top-0 bottom-0 bg-white w-64 p-6 z-50
          transition-transform duration-300 ease-in-out
          ${openMenu ? 'left-0 shadow-2xl' : '-left-64'}
          sm:relative sm:left-0 sm:shadow rounded flex flex-col justify-between
        `}
      >
        <nav>
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink to="/admin/home" className={getLinkStyles}>
                Principal
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/reservations" className={getLinkStyles}>
                Reservas
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/usuarios" className={getLinkStyles}>
                Usuarios
              </NavLink>
            </li>
          </ul>
          <hr className="opacity-15 mt-4 border-gray-300" />
        </nav>
        
        {renderLogoutButton(true)}
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="p-5 overflow-y-auto bg-gray-50 rounded h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;