const ContactSection = () => {
  return (
    <section id="contacto" className="bg-neutral-800 text-white pt-10 pb-15 my-5">
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
  );
};

export default ContactSection;