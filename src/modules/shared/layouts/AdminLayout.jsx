import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth'; 
import Button from '../components/Button';
import { AdminThemeProvider } from '../../admin/context/AdminThemeContext';
import { useAdminTheme } from '../../admin/hooks/useAdminTheme';

function ThemeSelector() {
  const { theme, setTheme } = useAdminTheme();

  return (
    <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-slate-700 dark:bg-slate-900">
      {[
        { key: 'light', label: 'Claro' },
        { key: 'dark', label: 'Oscuro' },
      ].map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => setTheme(item.key)}
          className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
            theme === item.key
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
          aria-pressed={theme === item.key}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function AdminShell() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { signout } = useAuth();

  const logout = () => {
    signout();
    navigate('/login');
  };

  const getLinkStyles = ({ isActive }) => {
    const baseClasses = "block w-full py-4 pl-4 rounded-xl transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-slate-800";
    
    return isActive 
      ? `${baseClasses} bg-amber-100 text-amber-700 font-semibold dark:bg-amber-500/15 dark:text-amber-300`
      : `${baseClasses} text-gray-600 dark:text-slate-300`;
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
    <div className="h-full grid grid-cols-1 grid-rows-[auto_1fr] bg-gray-100 text-gray-900 sm:gap-3 sm:grid-cols-[256px_1fr] dark:bg-slate-950 dark:text-slate-100">
      
      {/* HEADER */}
      <header className="flex items-center justify-between gap-3 p-4 shadow rounded bg-white border border-gray-100 sm:col-span-2 dark:border-slate-800 dark:bg-slate-900">
        <span className="font-bold text-lg text-gray-700 dark:text-slate-100">Mi Dashboard</span>
        
        <div className="hidden items-center gap-3 sm:flex">
          <ThemeSelector />
          {renderLogoutButton()}
        </div>
        
        {/* Botón Hamburguesa Móvil */}
        <button
          className="bg-transparent border-none shadow-none text-2xl text-gray-700 sm:hidden focus:outline-none dark:text-slate-100"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <span>&#215;</span> : <span>&#9776;</span>}
        </button>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`
          absolute top-0 bottom-0 bg-white w-64 p-6 z-50 dark:bg-slate-900 dark:text-slate-100
          transition-transform duration-300 ease-in-out
          ${openMenu ? 'left-0 shadow-2xl' : '-left-64'}
          sm:relative sm:left-0 sm:shadow rounded flex flex-col justify-between border border-gray-100 dark:border-slate-800
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
        
        <div className="flex flex-col gap-3">
          <div className="sm:hidden">
            <ThemeSelector />
          </div>
          {renderLogoutButton(true)}
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="p-5 overflow-y-auto bg-gray-50 rounded h-full dark:bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
};

function AdminLayout() {
  return (
    <AdminThemeProvider>
      <AdminShell />
    </AdminThemeProvider>
  );
};

export default AdminLayout;
