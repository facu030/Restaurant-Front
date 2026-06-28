import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format, parseISO, isValid } from "date-fns";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getMe } from "../../users/services/userService";
import {
  getAvailableSlots,
  createReservation,
} from "../services/reservationService";
import useAuth from "../../auth/hook/useAuth";
import CalendarSelector from "../components/CalendarSelector";
import bgImage from "../../../assets/facuimg/login-desk.png";

function formatTime(t) {
  return t;
}

function getCapacityConflictMessage(details) {
  if (details?.code !== "SLOT_CAPACITY_EXCEEDED") return null;

  return `El horario ${details.time} tiene ${details.remaining} lugares disponibles y solicitaste ${details.requested}. Capacidad total: ${details.capacity}.`;
}

export default function CreateReservationPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      time: "",
      pax: 1,
      clientName: "",
      email: "",
    },
  });

  const watchedDate = watch("date");
  const watchedTime = watch("time");

  const [slots, setSlots] = useState({ almuerzo: [], cena: [] });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [shift, setShift] = useState("dinner");

  const selectedDateObj = useMemo(() => {
    if (!watchedDate) return undefined;
    const parsed = parseISO(watchedDate);
    return isValid(parsed) ? parsed : undefined;
  }, [watchedDate]);

  const handleDateSelect = (newDate) => {
    if (newDate) {
      const dateStr = format(newDate, "yyyy-MM-dd");
      setValue("date", dateStr, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadUser = async () => {
      const { data } = await getMe();
      if (data) {
        setValue("clientName", data.userName || "");
        setValue("email", data.email || "");
      }
    };

    loadUser();
  }, [isAuthenticated, setValue]);

  useEffect(() => {
    const loadSlots = async () => {
      setSlots([]);
      setValue("time", "");
      if (watchedDate) {
        const { data } = await getAvailableSlots(watchedDate);
        if (data) setSlots(data);
      }
    };
    loadSlots();
  }, [watchedDate, setValue]);

  const filteredSlots = useMemo(() => {
    return shift === "lunch" ? slots.almuerzo : slots.cena;
  }, [slots, shift]);

  const onSubmit = async (formData) => {
    setMessage(null);

    if (!isAuthenticated) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="bg-slate-800 p-6 rounded-xl shadow-2xl max-w-sm w-full border border-slate-600 text-left font-sans">
              <h1 className="text-xl font-bold text-white mb-2 font-serif">
                Iniciar Sesión
              </h1>
              <p className="text-gray-300 mb-6 text-sm">
                Para confirmar tu reserva de forma segura, necesitas iniciar
                sesión. ¿Deseas ir al login?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 text-gray-400 font-medium hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  className="px-5 py-2 text-white font-bold bg-amber-600 hover:bg-amber-700 rounded-lg shadow-md transition-colors"
                  onClick={() => {
                    navigate("/login", { state: { from: location } });
                    onClose();
                  }}
                >
                  Ir al Login
                </button>
              </div>
            </div>
          );
        },
      });
      return;
    }

    setLoading(true);
    const { data, error } = await createReservation(formData);
    setLoading(false);

    if (data && !error) {
      setMessage("¡Éxito! Tu reserva ha sido confirmada.");
      setTimeout(() => navigate("/mis-reservas"), 2000);
    } else {
      const capacityMessage = getCapacityConflictMessage(error?.details);
      const isConflict = error?.status === 409;
      if (isConflict) {
        confirmAlert({
          title: "Capacidad insuficiente",
          message:
            capacityMessage ||
            "Lo sentimos, este horario ya no tiene capacidad suficiente. Por favor selecciona otro.",
          buttons: [{ label: "Entendido", onClick: () => {} }],
        });
        const { data: newSlots } = await getAvailableSlots(watchedDate);
        if (newSlots) setSlots(newSlots);
        setValue("time", "");
      } else {
        alert(error?.message || "Error al procesar la reserva.");
      }
    }
  };

  return (
    <div
      className="min-h-screen relative bg-cover bg-center flex flex-col items-center py-10 px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 w-full max-w-6xl">
        <h1 className="text-4xl font-serif font-bold text-amber-500 mb-2 drop-shadow-md text-center">
          Reservar una mesa
        </h1>
        <p className="text-gray-300 mb-8 font-medium text-center">
          Experiencia gastronómica exclusiva
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* COLUMNA IZQUIERDA: CALENDARIO */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900/90 p-6 rounded-xl border border-slate-700 shadow-2xl">
                <h3 className="text-xl font-serif text-white mb-4 border-b border-slate-700 pb-2">
                  Selecciona Fecha
                </h3>

                <CalendarSelector
                  selectedDate={selectedDateObj}
                  onSelect={handleDateSelect}
                  disabledDates={[{ before: new Date() }]}
                />

                <input
                  type="hidden"
                  {...register("date", { required: true })}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-2 text-center">
                    Selecciona una fecha válida
                  </p>
                )}
              </div>

              <div className="bg-slate-900/90 p-6 rounded-xl border border-slate-700 shadow-xl">
                <label className="block text-sm font-semibold text-white mb-4 uppercase tracking-wider text-center">
                  Número de Personas
                </label>
                <div className="flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      const val = Math.max(1, (watch("pax") || 2) - 1);
                      setValue("pax", val);
                    }}
                    className="w-12 h-12 rounded-full bg-slate-700 text-white text-xl hover:bg-amber-600 transition-colors"
                  >
                    -
                  </button>

                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-white">
                      {watch("pax")}
                    </span>
                    <span className="text-xs text-gray-400">Comensales</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const val = (watch("pax") || 2) + 1;
                      setValue("pax", val);
                    }}
                    className="w-12 h-12 rounded-full bg-slate-700 text-white text-xl hover:bg-amber-600 transition-colors"
                  >
                    +
                  </button>
                </div>
                <input type="hidden" {...register("pax", { required: true })} />
              </div>
            </div>

            {/* COLUMNA DERECHA: DETALLES */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900/90 p-6 rounded-xl border border-slate-700 shadow-2xl">
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                  <h3 className="text-xl font-serif text-white">Horario</h3>

                  <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        setShift("lunch");
                        setValue("time", "");
                      }}
                      className={`px-4 py-1 text-xs font-bold rounded uppercase tracking-wide transition-all ${shift === "lunch" ? "bg-amber-600 text-white" : "text-gray-400"}`}
                    >
                      Almuerzo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShift("dinner");
                        setValue("time", "");
                      }}
                      className={`px-4 py-1 text-xs font-bold rounded uppercase tracking-wide transition-all ${shift === "dinner" ? "bg-amber-600 text-white" : "text-gray-400"}`}
                    >
                      Cena
                    </button>
                  </div>
                </div>

                <input
                  type="hidden"
                  {...register("time", { required: "Selecciona un horario" })}
                />

                {!filteredSlots || filteredSlots.length === 0 ? (
                  <div className="py-8 text-center border-2 border-dashed border-slate-700 rounded-lg text-gray-500">
                    No hay mesas disponibles para este turno.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {filteredSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() =>
                          setValue("time", t, { shouldValidate: true })
                        }
                        className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                          watchedTime === t
                            ? "bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-900/50 scale-105"
                            : "border-slate-700 text-slate-300 hover:border-amber-500 hover:text-white"
                        }`}
                      >
                        {formatTime(t)}
                      </button>
                    ))}
                  </div>
                )}
                {errors.time && (
                  <p className="text-red-500 text-xs mt-2 text-right">
                    {errors.time.message}
                  </p>
                )}
              </div>

              <div className="bg-slate-900/90 p-6 rounded-xl border border-slate-700 shadow-2xl space-y-4">
                <h3 className="text-xl font-serif text-white mb-2 border-b border-slate-700 pb-2">
                  Tus Datos
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      {...register("clientName", {
                        required: "Requerido",
                        minLength: 3,
                      })}
                      className="w-full bg-slate-950 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.clientName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.clientName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
                      Email Registrado
                    </label>
                    <input
                      type="email"
                      readOnly
                      {...register("email")}
                      className="w-full bg-slate-900 border border-slate-700 text-gray-500 rounded-lg px-4 py-2 cursor-not-allowed focus:outline-none"
                      title="El email se toma de tu cuenta y no se puede modificar aquí"
                    />
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700">
                  {message && (
                    <div className="mb-4 p-3 bg-green-900/40 border border-green-600 text-green-200 rounded text-center text-sm">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-lg font-bold text-lg shadow-xl uppercase tracking-widest transition-all
                                ${
                                  loading
                                    ? "bg-slate-700 text-slate-500"
                                    : "bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white hover:shadow-orange-900/50"
                                }`}
                  >
                    {loading ? "Confirmando..." : "Confirmar Reserva"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
