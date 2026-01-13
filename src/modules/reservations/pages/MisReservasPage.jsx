import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/hook/useAuth";
import {
  getUserReservations,
  cancelUserReservation,
} from "../services/reservationService";
import bgImage from "../../../assets/facuimg/login-desk.png";

const MisReservasPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 1. Si no está autenticado, redirigir
    if (isAuthenticated === false) {
      setLoading(false);
      navigate("/login");
      return;
    }

    // 2. Si está autenticado pero aún no carga el usuario, esperamos
    if (isAuthenticated && !user) return;

    const fetchReservations = async () => {
      if (!user?.email) return;

      setLoading(true);
      // Llamamos al servicio pasando el email
      const { data, error } = await getUserReservations(user.email);

      if (data) {
        setReservations(data);
      } else {
        console.error(error);
      }
      setLoading(false);
    };

    fetchReservations();
  }, [isAuthenticated, navigate, user]); // Se ejecuta cuando 'user' cambia

  const handleCancelReservation = async (reservationId) => {
    if (!confirm("¿Estás seguro de cancelar esta reserva?")) return;

    const { error } = await cancelUserReservation(reservationId);

    if (error) {
      alert(error.message);
    } else {
      // Filtro la lista localmente para que desaparezca sin recargar
      setReservations((prev) =>
        prev.map((res) =>
          res.id === reservationId ? { ...res, status: "Cancelada" } : res
        )
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmada":
        return "text-green-400 border-green-400 bg-green-900/20";
      case "Pendiente":
        return "text-amber-400 border-amber-400 bg-amber-900/20";
      case "Cancelada":
        return "text-red-400 border-red-400 bg-red-900/20";
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Cargando tus reservas...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-500 font-serif">
              Mis Reservas
            </h1>
            <p className="text-gray-400">
              Gestiona tus próximas visitas a Cosa Nostra
            </p>
          </div>

          <button
            onClick={() => navigate("/reservar")}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
          >
            <span>+</span> Nueva Reserva
          </button>
        </div>

        {reservations.length === 0 ? (
          <div className="bg-slate-800/80 rounded-xl p-10 text-center border border-slate-700 backdrop-blur-sm">
            <p className="text-gray-300 text-lg mb-4">
              No tienes reservas activas.
            </p>
            <button
              onClick={() => navigate("/reservar")}
              className="text-amber-500 hover:underline font-semibold"
            >
              ¡Haz tu primera reserva aquí!
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
              >
                <div
                  className={`absolute top-0 left-0 w-1 h-full ${
                    res.status === "Cancelada" ? "bg-red-500" : "bg-amber-500"
                  }`}
                ></div>

                <div className="flex justify-between items-start mb-4 pl-3">
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">
                      Fecha
                    </p>
                    <p className="text-xl text-white font-semibold capitalize">
                      {res.date
                        ? new Date(res.date + "T12:00:00").toLocaleDateString(
                            "es-AR",
                            {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Fecha inválida"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                      res.status
                    )}`}
                  >
                    {res.status}
                  </span>
                </div>

                <div className="flex items-center gap-6 pl-3 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Hora</p>
                    <p className="text-lg text-white">{res.time} hs</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Personas</p>
                    <p className="text-lg text-white">{res.pax}</p>
                  </div>
                </div>

                {res.status !== "Cancelada" && (
                  <div className="pl-3 mt-4 border-t border-slate-700 pt-4 flex justify-end">
                    <button
                      onClick={() => handleCancelReservation(res.id)}
                      className="text-sm text-red-400 hover:text-red-300 hover:underline transition-colors"
                    >
                      Cancelar reserva
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisReservasPage;
