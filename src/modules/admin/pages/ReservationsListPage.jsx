import { useEffect, useMemo, useState } from "react";
import ReservationListTable from "../../reservations/components/ReservationListTable";
import ReservationForm from "../../reservations/components/ReservationForm";
import Modal from "../../shared/components/Modal";
import ReservationStatsCards from "../../reservations/components/ReservationStatsCards";

import {
  getReservations,
  updateReservation,
  deleteReservation,
} from "../../reservations/services/reservationService";

const getReservationErrorMessage = (error) => {
  if (error?.details?.code === "SLOT_CAPACITY_EXCEEDED") {
    const { time, remaining, requested, capacity } = error.details;
    return `El horario ${time} tiene ${remaining} lugares disponibles y solicitaste ${requested}. Capacidad total: ${capacity}.`;
  }

  return error?.message || error || "Error desconocido";
};

function ReservationsListPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await getReservations();

      if (data) {
        setReservations(data);
      } else {
        console.error("Error cargando reservas:", error);
        setReservations([]);
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return reservations.filter((r) => {
      const client = (r.clientName ?? r.client ?? "").toLowerCase();
      const email = (r.email ?? "").toLowerCase();
      const matchSearch =
        !s || client.includes(s) || email.includes(s);

      const matchStatus =
        statusFilter === "all"
          ? true
          : (r.status ?? "Pendiente") === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [reservations, search, statusFilter]);

  const stats = useMemo(() => {
    const total = reservations.length;
    const confirmed = reservations.filter(
      (r) => r.status === "Confirmada",
    ).length;
    const pending = reservations.filter(
      (r) => r.status === "Pendiente" || !r.status,
    ).length; // Agregado fallback a Pendiente
    const canceled = reservations.filter(
      (r) => r.status === "Cancelada",
    ).length;
    return { total, confirmed, pending, canceled };
  }, [reservations]);

  const handleEdit = (id) => {
    const reservaParaEditar = reservations.find(
      (r) => r._id === id || r.id === id,
    );
    if (reservaParaEditar) {
      setEditing(reservaParaEditar);
      setOpenEdit(true);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await deleteReservation(id);
      if (error) {
        alert("Error al eliminar: " + getReservationErrorMessage(error));
      return;
    }
    setReservations((prev) => prev.filter((r) => r._id !== id && r.id !== id));
  };

  const handleSaveEdit = async (formData) => {
    try {
      setSaving(true);
      const idToUpdate = editing._id || editing.id;
      const { data: updated, error } = await updateReservation(
        idToUpdate,
        formData,
      );

      if (updated && !error) {
        setReservations((prev) =>
          prev.map((r) =>
            (r._id || r.id) === (updated._id || updated.id) ? updated : r,
          ),
        );
        setOpenEdit(false);
        setEditing(null);
      } else {
        alert(
          "Error al guardar: " +
            getReservationErrorMessage(error),
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-slate-950">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">
            Gestión de Reservas
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Administra las reservas del restaurante
          </p>
        </div>
      </div>

      <ReservationStatsCards stats={stats} />

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">Lista de Reservas</h2>

          <div className="flex flex-col gap-3 md:flex-row md:items-center w-full md:w-auto">
            <input
              className="w-full md:w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Buscar cliente, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="w-full md:w-48 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todas los estados</option>
              <option value="Confirmada">Confirmadas</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Cancelada">Canceladas</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500 animate-pulse dark:text-slate-400">
            Cargando reservas...
          </div>
        ) : (
          <ReservationListTable
            reservations={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <Modal
        isOpen={openEdit}
        title="Editar Reserva"
        onClose={() => {
          if (saving) return;
          setOpenEdit(false);
          setEditing(null);
        }}
      >
        {editing && (
          <ReservationForm
            initialData={editing}
            onSubmit={handleSaveEdit}
            isAdmin={true}
            isLoading={saving}
          />
        )}
      </Modal>
    </div>
  );
}

export default ReservationsListPage;
