import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ReservationForm = ({
  initialData,
  onSubmit,
  onCancel,
  isAdmin = false,
  isLoading = false,
}) => {
  // 1. Inicializamos el hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clientName: "",
      email: "",
      date: "",
      time: "",
      pax: 2,
      status: "Pendiente",
    },
  });

  // 2. Cargar datos si estamos editando
  useEffect(() => {
    if (initialData) {
      let formattedDate = "";
      if (initialData.date) {
        formattedDate = initialData.date.substring(0, 10);
      }

      reset({
        clientName: initialData.clientName || "",
        email: initialData.email || "",
        date: formattedDate,
        time: initialData.time || "",
        pax: initialData.pax || 2,
        status: initialData.status || "Pendiente",
        id: initialData._id || initialData.id,
      });
    } else {
      // Si es modo crear, valores por defecto
      reset({
        clientName: "",
        email: "",
        date: "",
        time: "",
        pax: 2,
        status: "Pendiente",
      });
    }
  }, [initialData, reset]);

  // 3. Manejador del envío
  const onFormSubmit = (data) => {
    const payload = {
      ...data,
      clientName: data.clientName.trim(),
      email: data.email ? data.email.trim() : "",
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* --- Nombre Completo --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre Completo
        </label>
        <input
          type="text"
          placeholder="Ej: Juan Pérez"
          disabled={isLoading}
          {...register("clientName", {
            required: "El nombre es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent 
            ${errors.clientName ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.clientName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.clientName.message}
          </p>
        )}
      </div>

      {/* --- Email --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email (opcional)
        </label>
        <input
          type="email"
          placeholder="cliente@correo.com"
          disabled={isLoading}
          {...register("email", {
            required: false,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "El formato del email no es válido",
            },
          })}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent 
            ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* --- Fecha y Hora --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            disabled={isLoading}
            {...register("date", { required: "La fecha es obligatoria" })}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent 
              ${errors.date ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora
          </label>
          <input
            type="time"
            disabled={isLoading}
            {...register("time", { required: "La hora es obligatoria" })}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent 
              ${errors.time ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.time && (
            <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
          )}
        </div>
      </div>

      {/* --- Cantidad de Pax --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cantidad de Comensales
        </label>
        <input
          type="number"
          disabled={isLoading}
          {...register("pax", {
            required: "Campo obligatorio",
            valueAsNumber: true,
            min: { value: 1, message: "Mínimo 1 persona" },
            max: {
              value: 20,
              message: "Máximo 20 personas (para más, contáctenos)",
            },
          })}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent 
            ${errors.pax ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.pax && (
          <p className="text-red-500 text-xs mt-1">{errors.pax.message}</p>
        )}
      </div>

      {/* --- Estado (Solo Admin) --- */}
      {isAdmin && (
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Estado de la Reserva
          </label>
          <select
            disabled={isLoading}
            {...register("status")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
      )}

      {/* --- Botones --- */}
      <div className="space-y-2 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white font-bold py-2 px-4 rounded transition-colors
            ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-accent-600 hover:bg-accent-700"}
          `}
        >
          {isLoading
            ? "Guardando..."
            : initialData
              ? "Actualizar Reserva"
              : "Crear Reserva"}
        </button>

        {onCancel && (
          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="w-full rounded border py-2 font-semibold hover:bg-gray-50 text-gray-700"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ReservationForm;
