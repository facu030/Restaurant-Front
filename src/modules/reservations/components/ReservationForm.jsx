import { useEffect, useState } from "react";

const ReservationForm = ({
  initialData,
  onSubmit,
  onCancel,          
  isAdmin = false,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    date: "",
    time: "",
    pax: 2,
    status: "Pendiente",
  });


  useEffect(() => {
    if (initialData) {
      setFormData({
        clientName: initialData.clientName ?? "",
        email: initialData.email ?? "",
        date: initialData.date ?? "",
        time: initialData.time ?? "",
        pax: initialData.pax ?? 2,
        status: initialData.status ?? "Pendiente",
        id: initialData.id, 
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const payload = {
      ...formData,
      pax: Number(formData.pax) || 1,
      email: formData.email?.trim() || "", 
      clientName: formData.clientName.trim(),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre Completo
        </label>
        <input
          type="text"
          name="clientName"
          required
          value={formData.clientName}
          onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Ej: Juan Pérez"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email (opcional)
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="cliente@correo.com"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora
          </label>
          <input
            type="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cantidad de Comensales
        </label>
        <input
          type="number"
          name="pax"
          min="1"
          max="20"
          required
          value={formData.pax}
          onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          disabled={isLoading}
        />
      </div>

      {isAdmin && (
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Estado de la Reserva
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white"
            disabled={isLoading}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
      )}

      <div className="space-y-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white font-bold py-2 px-4 rounded transition-colors
            ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-accent-600 hover:bg-accent-700"}
          `}
        >
          {isLoading ? "Guardando..." : initialData ? "Actualizar Reserva" : "Crear Reserva"}
        </button>

        {onCancel && (
          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="w-full rounded border py-2 font-semibold hover:bg-gray-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ReservationForm;
