import Button from '../../shared/components/Button';
import heroImage from "../../../assets/facuimg/Logo-hero.png";

const Hero = () => {
  return (
    <section 
    id="hero"
      className="relative w-full h-[calc(100dvh-80px)] bg-cover bg-center bg-no-repeat py-32 sm:py-48 lg:py-60 mb-15 pb-15 "
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 sm:bg-black/50"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-600 mb-5 drop-shadow-lg">
          CosaNostra
        </h1>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          Sabores que cuentan historias
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-medium">
          Disfrutá de una experiencia gastronómica única. Reservá tu mesa y viví una noche inolvidable.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/reservar">
            <Button className="w-full sm:w-auto px-8 py-3 text-lg font-semibold shadow-xl hover:scale-105 transition-transform">
              Reservar ahora
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};


export default Hero;