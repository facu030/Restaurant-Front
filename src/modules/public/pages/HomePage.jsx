import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import GallerySection from "../components/GallerySection";
import ContactSection from "../components/ContactSection";

const HomePage = () => {
  const { hash } = useLocation();

  // Este efecto se ejecuta cada vez que cambia el "hash" de la URL
  useEffect(() => {
    if (hash) {
      // Buscamos el elemento por su id (ej: #contacto)
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
        window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </main>
    </div>
  );
};

export default HomePage;