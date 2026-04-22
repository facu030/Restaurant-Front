import { useState, useEffect } from "react";
import img1 from "../../../assets/img1.png";
import img2 from "../../../assets/img2.png";
import img3 from "../../../assets/img3.png";
import img4 from "../../../assets/img4.png";
import img5 from "../../../assets/img5.png";
import img6 from "../../../assets/img6.png";
import img7 from "../../../assets/img7.png";
import img8 from "../../../assets/img8.png";
import img9 from "../../../assets/img9.png";

const GallerySection = () => {
  const [active, setActive] = useState(0);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const total = images.length;

  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const nextSlide = () => {
    if (active >= total - itemsPerPage) {
      setActive(0);
    } else {
      setActive((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (active === 0) {
      setActive(total - itemsPerPage);
    } else {
      setActive((prev) => prev - 1);
    }
  };

  return (
    <section id="galeria" className="scroll-mt-24">
      <h1 className="text-center my-5 text-3xl font-semibold mb-6">Galería</h1>
      <div className="max-w-7xl mx-auto px-4 md:px-8 my-5">
        <div className="relative overflow-hidden rounded-xl bg-neutral-900 shadow-2xl">
          
          {/* Botón Anterior */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white p-3 rounded-full hover:bg-amber-600 transition backdrop-blur-sm"
          >
            ❮
          </button>
          
          {/* Botón Siguiente */}
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white p-3 rounded-full hover:bg-amber-600 transition backdrop-blur-sm"
          >
            ❯
          </button>

          {/* Carrusel */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${active * (100 / itemsPerPage)}%)` 
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="w-full md:w-1/3 flex-shrink-0 h-[250px] md:h-[350px] p-2 flex items-center justify-center"
              >
                <div className="w-full h-full bg-black overflow-hidden rounded-lg relative group">
                    <img
                    src={img}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    alt={`Plato ${i + 1}`}
                    />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.slice(0, total - itemsPerPage + 1).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === i ? "w-8 bg-amber-500" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;