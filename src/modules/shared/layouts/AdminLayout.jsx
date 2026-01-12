import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth'; // Ajusta ruta si es necesario
import Button from '../components/Button';
import { useEffect } from 'react';

function AdminLayout() {
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const { signout } = useAuth();

  const logout = () => {
    signout();
    navigate('/login');
  };

  useEffect(() => {
    // 1. Al MONTAR el componente (Entrar al Admin):
    // sacamos la clase 'dark' del HTML para forzar el modo claro
    document.documentElement.classList.remove('dark');

    // 2. Al DESMONTAR (Salir del Admin):
    return () => document.documentElement.classList.add('dark');
  }, []);

  const getLinkStyles = ({ isActive }) => (
    `
      pl-4 w-full block  pt-4 pb-4 rounded-4xl transition hover:bg-gray-100
      ${isActive
      ? 'bg-accent-200 hover:bg-accent-300 '
      : ''
    }
    `
  );

  const renderLogoutButton = (mobile = false) => (
    <Button className={`${mobile ? 'block w-full sm:hidden' :  'hidden sm:block' }`} onClick={logout}>Cerrar sesión</Button>
  );

  return (
    <div
      className="
        h-full
        grid
        grid-cols-1
        grid-rows-[auto_1fr]

        sm:gap-3
        sm:grid-cols-[256px_1fr]
      "
    >
      <header
        className="
          flex
          items-center
          justify-between
          p-4
          shadow
          rounded
          bg-white

          sm:col-span-2
        "
      >
        <span>Mi Dashboard</span>
        {renderLogoutButton()}
        <button
          className="
            bg-transparent
            border-none
            shadow-none

            sm:hidden
          "
          onClick={() => setOpenMenu(!openMenu)}
        >{ openMenu ? <span>&#215;</span> : <span>&#9776;</span>}</button>
      </header>
      <aside
        className={`
          absolute
          top-0
          bottom-0
          bg-white
          w-64
          p-6
          ${openMenu ? 'left-0' : 'left-[-256px]'}
          rounded
          shadow
          flex
          flex-col
          justify-between

          sm:relative
          sm:left-0
        `}
      >
        <nav>
          <ul
            className='flex flex-col'
          >
            <li>
              <NavLink
                to='/admin/home'
                className={getLinkStyles}
              >Principal</NavLink>
            </li>
            <li>
              <NavLink
                to='/admin/reservations'
                className={getLinkStyles}
              >Reservas</NavLink>
            </li>
            <li>
              <NavLink
                to='/admin/users'
                className={getLinkStyles}
              >Usuarios</NavLink>
            </li>
          </ul>
          <hr className='opacity-15 mt-4' />
        </nav>
        {renderLogoutButton(true)}
      </aside>
      <main className="p-5 overflow-y-scroll bg-gray-50 rounded">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;