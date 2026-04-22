import Restaurant from "../../../assets/Restaurant.jpg"; 

const AboutSection = () => {
  return (
    <section id="quienes-somos" className="scroll-mt-24 my-5">
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
            experiencia gastronómica actual, combinando sabores bien definidos,
            ingredientes frescos y una presentación cuidada.
            <br />
            <br />
            Creemos en una cocina simple pero bien hecha, donde cada plato esté
            pensado para disfrutarse tanto en el sabor como en el momento. <br />
            <br />
            Nuestro proyecto surge de la pasión por la gastronomía y el deseo de
            crear un espacio cómodo, moderno y accesible, ideal para compartir
            con amigos o familia. Trabajamos con productos seleccionados y una
            atención cercana, buscando que cada visita sea una experiencia
            positiva y agradable.
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
  );
};

export default AboutSection;