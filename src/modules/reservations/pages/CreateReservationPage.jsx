import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAvailableSlots,
  createReservation,
} from "../services/reservationService";
import useAuth from "../../auth/hook/useAuth";
import bgImage from "../../../assets/facuimg/login-desk.png";

function formatTime(t) {
  return t; // ajustar el formato si es necesario
}

export default function CreateReservationPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [shift, setShift] = useState("dinner");

  const [pax, setPax] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 1. Cargar datos del usuario si está logueado
  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.username || user.name || "");
      setEmail(user.email || "");
    }
  }, [isAuthenticated, user]);

  // 2. Cargar Horarios
  useEffect(() => {
    const load = async () => {
      setSlots([]);
      setSelectedTime("");

      // Llamada al servicio desestructurando { data }
      const { data } = await getAvailableSlots(date);

      if (data) {
        setSlots(data);
      } else {
        // Si hay error o no hay data, dejamos slots vacío
        setSlots([]);
      }
    };
    load();
  }, [date]);

  // 3. Filtrado Almuerzo/Cena
  const filteredSlots = useMemo(() => {
    return slots.filter((time) => {
      const hour = parseInt(time.split(":")[0], 10);
      if (shift === "lunch") return hour < 17;
      return hour >= 17;
    });
  }, [slots, shift]);

  // 4. Enviar Formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!selectedTime) return alert("Seleccioná un horario");

    // Validación de Login
    if (!isAuthenticated) {
      if (confirm("Necesitas iniciar sesión para confirmar. ¿Ir al login?")) {
        navigate("/login", { state: { from: location } });
      }
      return;
    }

    if (!name) return alert("Ingresá un nombre");

    setLoading(true);

    // Preparar el objeto para enviar
    const reservationData = {
      nombreCompleto: name,
      email,
      fecha: date,
      hora: selectedTime,
      personas: pax,
    };

    // Llamada al servicio
    const { data, error } = await createReservation(reservationData);

    setLoading(false);

    if (data && !error) {
      setMessage("¡Éxito! Tu reserva ha sido confirmada.");
      setTimeout(() => navigate("/mis-reservas"), 2000);
    } else {
      // ERROR
      const isConflict =
        error?.status === 409 || error?.message?.includes("ocupado");

      if (isConflict) {
        alert(
          "Lo sentimos, ese horario acaba de ser reservado por otra persona. Por favor elige otro."
        );
        const { data: newSlots } = await getAvailableSlots(date);
        if (newSlots) setSlots(newSlots);
        setSelectedTime(""); // Limpiar selección
      } else {
        alert(
          error?.message || "Error al procesar la reserva. Intenta nuevamente."
        );
      }
    }
  };

  return (
    <div
      className="min-h-screen relative bg-cover bg-center flex flex-col items-center py-10 px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-amber-500 mb-2 drop-shadow-md">
          Reservar una mesa
        </h1>
        <p className="text-gray-300 mb-8 font-medium">
          Selecciona el día y horario de tu preferencia.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/95 p-6 md:p-8 rounded-xl shadow-2xl space-y-6 border border-slate-700 backdrop-blur-sm"
        >
          {message && (
            <div className="p-4 bg-green-900/60 text-green-200 rounded-lg border border-green-700">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500 color-scheme-dark"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Turno
              </label>
              <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setShift("lunch");
                    setSelectedTime("");
                  }}
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${
                    shift === "lunch"
                      ? "bg-amber-600 text-white shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  ☀️ Almuerzo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShift("dinner");
                    setSelectedTime("");
                  }}
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${
                    shift === "dinner"
                      ? "bg-amber-600 text-white shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  🌙 Cena
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Horarios disponibles ({shift === "lunch" ? "Almuerzo" : "Cena"})
            </label>

            {filteredSlots.length === 0 ? (
              <div className="p-4 bg-slate-950/50 text-gray-400 rounded-lg text-center border border-dashed border-slate-700">
                No hay horarios disponibles para el turno de{" "}
                {shift === "lunch" ? "almuerzo" : "cena"}.
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {filteredSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`
                      py-2 px-3 rounded-lg text-sm font-medium transition-all border
                      ${
                        selectedTime === t
                          ? "bg-amber-600 text-white border-amber-600 shadow-lg scale-105"
                          : "bg-slate-800 border-slate-600 text-gray-200 hover:bg-slate-700 hover:border-amber-500"
                      }
                    `}
                  >
                    {formatTime(t)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Nombre de la reserva
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email de contacto
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ej: juan@email.com"
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Cantidad de comensales
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={pax}
                  onChange={(e) => setPax(Number(e.target.value))}
                  className="w-24 bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 text-center focus:ring-amber-500 focus:border-amber-500 font-bold text-lg"
                />
                <span className="ml-3 text-gray-300 text-sm font-medium">
                  personas
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-700">
            {!isAuthenticated && (
              <p className="text-sm text-amber-500 mb-4 flex items-center bg-amber-950/40 p-2 rounded border border-amber-900/50">
                <span className="mr-2">ℹ️</span>
                Se te pedirá iniciar sesión al confirmar.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full md:w-auto px-8 py-3 rounded-md text-white font-bold shadow-lg transition-all uppercase tracking-wide
                ${
                  loading
                    ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 hover:shadow-amber-900/40 cursor-pointer"
                }
              `}
            >
              {loading
                ? "Procesando..."
                : isAuthenticated
                ? "Confirmar Reserva"
                : "Iniciar Sesión y Reservar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
