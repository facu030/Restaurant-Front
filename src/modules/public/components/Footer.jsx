import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logodesk from "../../../assets/facuimg/mob.png"; 

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-5 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center justify-center ">
            <NavLink to="/" className="text-2xl font-bold text-accent">
              <img
                src={logodesk}
                alt="Logo Restaurante"
                className="h-30 w-auto object-contain"
              />
            </NavLink>
          </div>
          
          <div className="flex flex-col items-center">
            <h5 className="text-gray-100 font-bold mb-2 text-xl text-center">
              Secciones
            </h5>
            <ul className="list-none p-0 text-center">
              <li className="mb-1">
                <a href="#quienes-somos" className="text-gray-100 no-underline text-base hover:text-white">
                  Quienes Somos
                </a>
              </li>
              <li className="mb-1">
                <a href="#galeria" className="text-gray-100 no-underline text-base hover:text-white">
                  Galeria
                </a>
              </li>
              <li className="mb-1">
                <a href="#contacto" className="text-gray-100 no-underline text-base hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h5 className="text-gray-100 font-bold mb-2 text-xl text-center">
              Reservas
            </h5>
            <ul className="list-none p-0 text-center">
              <li className="mb-1">
                <Link to="/mis-reservas" className="text-gray-100 no-underline text-base hover:text-white">
                  Mis Reservas
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/reservar" className="text-gray-100 no-underline text-base hover:text-white">
                  Reservar
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h5 className="text-gray-100 font-bold mb-2 text-xl text-center">
              Restaurante Cosa Nostra
            </h5>
            <ul className="list-none p-0 text-center">
              <li className="text-gray-100 mb-2 text-base">
                Seguinos en nuestras redes:
              </li>
              <div className="flex justify-center items-center gap-3">
                <a href="#" className="text-gray-100 hover:scale-110 transition-transform">
                  <i className="bi bi-instagram text-2xl"></i>
                </a>
                <a href="#" className="text-gray-100 hover:scale-110 transition-transform">
                  <i className="bi bi-twitter text-2xl"></i>
                </a>
                <a href="#" className="text-gray-100 hover:scale-110 transition-transform">
                  <i className="bi bi-facebook text-2xl"></i>
                </a>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;