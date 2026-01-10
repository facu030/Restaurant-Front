import React from "react";
import Restaurant from "../../../assets/Restaurant.jpg";

const Inicio = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section id="quienes-somos" className="scroll-mt-24">
        <h1 className="text-center my-5 text-3xl font-semibold mb-6">
          Quiénes Somos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-5 p-5 max-w-6xl mx-auto px-8">
          <div>
            <img
              className="w-full h-auto rounded-xl object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              src={Restaurant}
              alt="fondo restaurant"
            />
          </div>
          <div>
            <p>
              <br />
              Somos un restaurante moderno que nace con la idea de ofrecer una
              experiencia gastronómica actual, combinando sabores bien
              definidos, ingredientes frescos y una presentación cuidada.
              <br />
              <br />
              Creemos en una cocina simple pero bien hecha, donde cada plato
              esté pensado para disfrutarse tanto en el sabor como en el
              momento. <br />
              <br />
              Nuestro proyecto surge de la pasión por la gastronomía y el deseo
              de crear un espacio cómodo, moderno y accesible, ideal para
              compartir con amigos o familia. Trabajamos con productos
              seleccionados y una atención cercana, buscando que cada visita sea
              una experiencia positiva y agradable.
              <br />
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-8 mt-10 text-center">
              <div>
                <p className="text-red-500 text-3xl font-bold">+35</p>
                <p className="text-sm text-gray-500">Opciones en carta</p>
              </div>

              <div>
                <p className="text-red-500 text-3xl font-bold">100%</p>
                <p className="text-sm text-gray-500">Ingredientes frescos</p>
              </div>

              <div>
                <p className="text-red-500 text-3xl font-bold">15</p>
                <p className="text-sm text-gray-500">Miembros del equipo</p>
              </div>
            </div>
          </div>
        </div>
        </section>
      </main>
      <footer className="bg-neutral-900 text-white pt-5 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center"></div>
            <div className="flex flex-col items-center">
              <h5 className="text-gray-100 font-bold mb-2 text-xl text-center">
                Secciones
              </h5>
              <ul className="list-none p-0 text-center">
                <li className="mb-1">
                  <a
                    href="#quienes-somos"
                    className="text-gray-100 no-underline text-base hover:text-white"
                  >
                    Quienes Somos
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href=""
                    className="text-gray-100 no-underline text-base hover:text-white"
                  >
                    Galeria
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href=""
                    className="text-gray-100 no-underline text-base hover:text-white"
                  >
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
                  <a
                    href=""
                    className="text-gray-100 no-underline text-base hover:text-white"
                  >
                    Mis Reservas
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href=""
                    className="text-gray-100 no-underline text-base hover:text-white"
                  >
                    Admin
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-gray-100 font-bold mb-2 text-xl text-center">
                Restaurante
              </h5>
              <ul className="list-none p-0 text-center">
                <li className="text-gray-100 mb-2 text-base">
                  Seguinos en nuestras redes:
                </li>
                <div className="flex justify-center items-center gap-3">
                  <a
                    href=""
                    className="text-gray-100 hover:scale-110 transition-transform"
                  >
                    <i className="bi bi-instagram text-2xl"></i>
                  </a>
                  <a
                    href=""
                    className="text-gray-100 hover:scale-110 transition-transform"
                  >
                    <i className="bi bi-twitter text-2xl"></i>
                  </a>
                  <a
                    href=""
                    className="text-gray-100 hover:scale-110 transition-transform"
                  >
                    <i className="bi bi-facebook text-2xl"></i>
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
