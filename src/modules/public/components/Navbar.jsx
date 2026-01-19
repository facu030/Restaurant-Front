import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../auth/hook/useAuth";
import Button from "../../shared/components/Button";
import logodesk from "../../../assets/facuimg/Logo-desk.png";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, singout } = useAuth();

  const logout = () => {
    if (typeof singout === "function") singout();
    navigate("/");
    setOpenMenu(false);
  };

  const baseClasses = "px-3 py-2 rounded-md transition-colors duration-200 font-medium";
  const inactiveColor = "text-gray-300 hover:text-white hover:bg-neutral-800";
  const activeColor = "text-white bg-neutral-800";

  const scrollLinkClass = `${baseClasses} ${inactiveColor}`;

  const navLinkClass = ({ isActive }) =>
    `${baseClasses} ${isActive ? activeColor : inactiveColor}`;

  const authButtonsDesktop = isAuthenticated ? (
    <Button
      className="hidden sm:inline-flex px-4 py-1 rounded-full bg-neutral-200 text-neutral-900 text-sm font-semibold hover:bg-white"
      onClick={logout}
    >
      Cerrar sesión
    </Button>
  ) : (
    <div className="hidden sm:flex gap-2 items-center">
      <Button
        className="px-4 py-1 rounded-full bg-accent-500 hover:bg-accent-400 text-white text-sm font-semibold"
        onClick={() => navigate("/login")}
      >
        Iniciar sesión
      </Button>
      <Button
        className="px-4 py-1 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white text-sm"
        onClick={() => navigate("/register")}
      >
        Registrarse
      </Button>
    </div>
  );

  const authButtonsMobile = isAuthenticated ? (
    <Button
      className="block w-full sm:hidden mt-4 bg-neutral-700 text-white"
      onClick={() => {
        logout();
      }}
    >
      Cerrar sesión
    </Button>
  ) : (
    <div className="flex flex-col gap-2 mt-4 sm:hidden">
      <Button
        className="w-full rounded-full bg-accent-500 text-white text-sm font-semibold"
        onClick={() => {
          navigate("/login");
          setOpenMenu(false);
        }}
      >
        Iniciar sesión
      </Button>
      <Button
        className="w-full rounded-full bg-neutral-700 text-white text-sm"
        onClick={() => {
          navigate("/register");
          setOpenMenu(false);
        }}
      >
        Registrarse
      </Button>
    </div>
  );

  return (
    <header className="bg-neutral-900 shadow-md sticky top-0 z-50 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center ">
            <NavLink to="/" className="text-2xl font-bold">
              <img
                src={logodesk}
                alt="Logo Restaurante"
                className="h-16 w-auto object-contain"
              />
            </NavLink>
          </div>
          
          <div className="flex items-center sm:hidden"></div>

          {/* Links desktop */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <a href="/#quienes-somos" className={scrollLinkClass}>
              Quiénes somos
            </a>
            <a href="/#galeria" className={scrollLinkClass}>
              Galería
            </a>
            <a href="/#contacto" className={scrollLinkClass}>
              Contacto
            </a>
            
            {isAuthenticated && (
              <NavLink to="/mis-reservas" className={navLinkClass}>
                Mis Reservas
              </NavLink>
            )}
            <div className="ml-4">
                {authButtonsDesktop}
            </div>
          </div>

          {/* Botón menú mobile */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-neutral-800 focus:outline-none"
            >
              {openMenu ? (
                <span className="text-2xl">&times;</span>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`sm:hidden bg-neutral-900 border-t border-neutral-800 ${
          openMenu ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-4 pb-6">
          <nav className="flex flex-col gap-2">
            <a
              href="/#quienes-somos"
              className={scrollLinkClass}
              onClick={() => setOpenMenu(false)}
            >
              Quiénes somos
            </a>
            <a
              href="/#galeria"
              className={scrollLinkClass}
              onClick={() => setOpenMenu(false)}
            >
              Galería de imágenes
            </a>
            <a
              href="/#contacto"
              className={scrollLinkClass}
              onClick={() => setOpenMenu(false)}
            >
              Contacto
            </a>

            {isAuthenticated && (
              <NavLink
                to="/mis-reservas"
                className={navLinkClass}
                onClick={() => setOpenMenu(false)}
              >
                Mis Reservas
              </NavLink>
            )}

            {authButtonsMobile}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;