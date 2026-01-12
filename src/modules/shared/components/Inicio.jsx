import React from "react";
import Restaurant from "../../../assets/Restaurant.jpg";
import img1 from "../../../assets/img1.png";
import img2 from "../../../assets/img2.png";
import img3 from "../../../assets/img3.png";
import img4 from "../../../assets/img4.png";
import img5 from "../../../assets/img5.png";
import img6 from "../../../assets/img6.png";
import img7 from "../../../assets/img7.png";
import img8 from "../../../assets/img8.png";
import img9 from "../../../assets/img9.png";
import { useState } from "react";

const Inicio = () => {
  const [active, setActive] = useState(0);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const total = images.length;
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
              <p className="text-base">
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
                Nuestro proyecto surge de la pasión por la gastronomía y el
                deseo de crear un espacio cómodo, moderno y accesible, ideal
                para compartir con amigos o familia. Trabajamos con productos
                seleccionados y una atención cercana, buscando que cada visita
                sea una experiencia positiva y agradable.
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
        <section id="galeria" className="scroll-mt-24">
          <h1 className="text-center my-5 text-3xl font-semibold mb-6">
            Galería
          </h1>
          <div className="max-w-6xl mx-auto px-8 my-5">
            <div className="relative overflow-hidden rounded-xl">
              <button
                onClick={() =>
                  setActive((prev) => (prev === 0 ? total - 1 : prev - 1))
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                 bg-black/40 text-white p-2 rounded-full
                 hover:bg-black/60 transition"
              >
                ❮
              </button>
              <button
                onClick={() =>
                  setActive((prev) => (prev === total - 1 ? 0 : prev + 1))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                 bg-black/40 text-white p-2 rounded-full
                 hover:bg-black/60 transition"
              >
                ❯
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-3 h-3 rounded-full transition ${
                      active === i ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {[img1, img2, img3, img4, img5, img6, img7, img8, img9].map(
                  (img, i) => (
                    <div
                      key={i}
                      className="w-full flex-shrink-0 aspect-video overflow-hidden"
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt={`slide-${i}`}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
        <section
          id="contacto"
          className="bg-neutral-800 text-white pt-10 pb-15"
        >
          <h1 className="text-center my-5 text-3xl font-semibold">Contacto</h1>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <i className="bi bi-telephone text-4xl mb-4 text-red-400"></i>
                <h5 className="text-gray-100 font-bold mb-2 text-xl text-center">
                  Teléfono
                </h5>
                <ul className="list-none p-0 text-center">
                  <li className="mb-1 text-base">+54 11 4567 2890</li>
                  <li className="mb-1 text-base">+54 11 6234 7812</li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <i className="bi bi-envelope text-4xl mb-4 text-red-400"></i>
                <h5 className="text-gray-100 font-bold mb-2 text-xl text-center">
                  Email
                </h5>
                <ul className="list-none p-0 text-center">
                  <li className="mb-1 text-base">info@elbuenbocado.com</li>
                  <li className="mb-1 text-base">reservas@elbuenbocado.com</li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <i className="bi bi-geo-alt text-4xl mb-4 text-red-400"></i>
                <h5 className="text-gray-100 font-bold mb-2 text-xl text-center">
                  Dirección
                </h5>
                <ul className="list-none p-0 text-center">
                  <li className="mb-1 text-base">Av. Mate de Luna 2140</li>
                  <li className="mb-1 text-base">Tucumán, Argentina</li>
                </ul>
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
                    href="#galeria"
                    className="text-gray-100 no-underline text-base hover:text-white"
                  >
                    Galeria
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#contacto"
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
