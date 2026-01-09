import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth'; // Ajusta ruta si es necesario
import Button from '../components/Button';

function AdminLayout() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { singout } = useAuth(); // Asumiendo que 'singout' es tu función (typo: signout?)

  const logout = () => {
    singout();
    navigate('/login');
  };

  const getLinkStyles = ({ isActive }) => (
    `
      pl-4 w-full block pt-4 pb-4 rounded-xl transition hover:bg-gray-100
      ${isActive
      ? 'bg-purple-200 hover:bg-purple-100 font-bold'
      : ''
    }
    `
  );

  const renderLogoutButton = (mobile = false) => (
    <Button 
      className={`${mobile ? 'block w-full sm:hidden' :  'hidden sm:block' }`} 
      onClick={logout}
    >
      Cerrar sesión
    </Button>
  );

  return (
    <div className="h-full grid grid-cols-1 grid-rows-[auto_1fr] sm:gap-3 sm:grid-cols-[256px_1fr]">
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between p-4 shadow rounded bg-white sm:col-span-2">
        <span className="font-bold text-lg">Panel Restaurante</span>
        {renderLogoutButton()}
        <button
          className="bg-transparent border-none shadow-none sm:hidden text-2xl"
          onClick={() => setOpenMenu(!openMenu)}
        >
          { openMenu ? <span>&#215;</span> : <span>&#9776;</span>}
        </button>
      </header>

      {/* --- SIDEBAR --- */}
      <aside
        className={`
          absolute top-0 bottom-0 bg-white w-64 p-6 z-50
          ${openMenu ? 'left-0' : 'left-[-256px]'}
          rounded shadow flex flex-col justify-between transition-all duration-300
          sm:relative sm:left-0
        `}
      >
        <nav>
          <ul className='flex flex-col gap-2'>
            <li>
              {/* Ruta Raíz (/admin) */}
              <NavLink to='/admin' end className={getLinkStyles}>
                Dashboard
              </NavLink>
            </li>
            <li>
              {/* Ruta Usuarios (/admin/users) - Mockup Pág 10 */}
              <NavLink to='/admin/users' className={getLinkStyles}>
                Usuarios
              </NavLink>
            </li>
            <li>
              {/* Ruta Reservas (/admin/reservations) - Mockup Pág 11 */}
              <NavLink to='/admin/reservations' className={getLinkStyles}>
                Reservas
              </NavLink>
            </li>
          </ul>
          <hr className='opacity-15 mt-4' />
        </nav>
        {renderLogoutButton(true)}
      </aside>

      {/* --- CONTENIDO (OUTLET) --- */}
      <main className="p-5 overflow-y-scroll bg-gray-50 rounded">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;