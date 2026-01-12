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

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md ${
      isActive
        ? "text-accent font-semibold"
        : "text-gray-700 hover:text-gray-900"
    }`;

  const authButtonsDesktop = isAuthenticated ? (
    <Button
      className="hidden sm:inline-flex px-4 py-1 rounded-full bg-neutral-800 text-white text-sm"
      onClick={logout}
    >
      Cerrar sesión
    </Button>
  ) : (
    <div className="hidden sm:flex gap-2 items-center">
      <Button
        className="px-4 py-1 rounded-full bg-accent-200 text-xs sm:text-sm"
        onClick={() => navigate("/login")}
      >
        Iniciar sesión
      </Button>
      <Button
        className="px-4 py-1 rounded-full bg-neutral-200 text-xs sm:text-sm"
        onClick={() => navigate("/register")}
      >
        Registrarse
      </Button>
    </div>
  );

  const authButtonsMobile = isAuthenticated ? (
    <Button
      className="block w-full sm:hidden mt-4"
      onClick={() => {
        logout();
      }}
    >
      Cerrar sesión
    </Button>
  ) : (
    <div className="flex flex-col gap-2 mt-4 sm:hidden">
      <Button
        className="w-full rounded-full bg-accent-200 text-sm"
        onClick={() => {
          navigate("/login");
          setOpenMenu(false);
        }}
      >
        Iniciar sesión
      </Button>
      <Button
        className="w-full rounded-full bg-neutral-200 text-sm"
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
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center ">
            <NavLink to="/" className="text-2xl font-bold text-accent">
              <img
                src={logodesk}
                alt="Logo Restaurante"
                className="h-30 w-auto object-contain"
              />
            </NavLink>
          </div>
          <div className="flex items-center sm:hidden"></div>

          {/* Links desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className={linkClass}>
              Quiénes somos
            </a>
            <a href="#gallery" className={linkClass}>
              Galería de imágenes
            </a>
            <a href="#contact" className={linkClass}>
              Contacto
            </a>
            {isAuthenticated && (
              <NavLink to="/mis-reservas" className={linkClass}>
                Mis Reservas
              </NavLink>
            )}
            {authButtonsDesktop}
          </div>

          {/* Botón menú mobile */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {openMenu ? (
                <span className="text-xl">&times;</span>
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
        className={`sm:hidden bg-white border-t ${
          openMenu ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-4">
          <nav className="flex flex-col gap-2">
            <a
              href="#about"
              className={linkClass}
              onClick={() => setOpenMenu(false)}
            >
              Quiénes somos
            </a>
            <a
              href="#gallery"
              className={linkClass}
              onClick={() => setOpenMenu(false)}
            >
              Galería de imágenes
            </a>
            <a
              href="#contact"
              className={linkClass}
              onClick={() => setOpenMenu(false)}
            >
              Contacto
            </a>

            {isAuthenticated && (
              <NavLink
                to="/mis-reservas"
                className={linkClass}
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
