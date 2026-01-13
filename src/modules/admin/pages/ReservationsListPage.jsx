import { useEffect, useMemo, useState } from "react";
import ReservationListTable from "../../reservations/components/ReservationListTable";
import ReservationForm from "../../reservations/components/ReservationForm";
import Modal from "../../shared/components/Modal";

import {
  updateReservation,
  deleteReservation,
} from "../../reservations/services/reservationService";
import { leerReservas } from "../helpers/queries.js";

function StatCard({ title, value, valueClassName = "" }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}

function ReservationsListPage() {
  const [reservations, setReservations] = useState([]); // ← no lo borro
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const [listaReservas, setListaReservas] = useState([]);

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = async () => {
    const respuesta = await leerReservas();

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      const adaptadas = datos.map((r) => ({
        id: r._id,
        clientName: r.nombreCompleto,
        email: r.email,
        date: r.fecha,
        time: r.hora,
        pax: r.personas,
        status: r.estado ?? "Pendiente",
      }));

      setListaReservas(adaptadas);
    } else {
      console.info("Ocurrio un error al buscar las reservas");
    }
    setLoading(false);
  };
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setReservations([]);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return listaReservas.filter((r) => {
      const client = (r.clientName ?? "").toLowerCase();
      const email = (r.email ?? "").toLowerCase();
      const id = String(r.id ?? "");

      const matchSearch =
        !s || client.includes(s) || email.includes(s) || id.includes(s);

      const matchStatus =
        statusFilter === "all"
          ? true
          : (r.status ?? "Pendiente") === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [listaReservas, search, statusFilter]);
  const stats = useMemo(() => {
    const total = listaReservas.length;
    const confirmed = listaReservas.filter(
      (r) => r.status === "Confirmada"
    ).length;
    const pending = listaReservas.filter(
      (r) => r.status === "Pendiente"
    ).length;
    const canceled = listaReservas.filter(
      (r) => r.status === "Cancelada"
    ).length;

    return { total, confirmed, pending, canceled };
  }, [listaReservas]);

  const handleEdit = (id) => {
    const reserva = listaReservas.find((r) => r.id === id);
    setEditing(reserva);
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que querés eliminar esta reserva?")) return;

    await deleteReservation(id);
    setListaReservas((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSaveEdit = async (formData) => {
    try {
      setSaving(true);

      setListaReservas((prev) =>
        prev.map((r) => (r.id === editing.id ? { ...r, ...formData } : r))
      );

      setOpenEdit(false);
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Reservas
        </h1>
        <p className="mt-2 text-gray-500">
          Administra todas las reservas del restaurante
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Lista de Reservas</h2>

          <div className="flex flex-col gap-3 md:flex-row md:items-center w-full md:w-auto">
            <input
              className="w-full md:w-64 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Buscar cliente, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="w-full md:w-48 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
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
          <div className="text-center py-10 text-gray-500 animate-pulse">
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Reservas" value={stats.total} />
        <StatCard
          title="Confirmadas"
          value={stats.confirmed}
          valueClassName="text-green-600"
        />
        <StatCard
          title="Pendientes"
          value={stats.pending}
          valueClassName="text-yellow-600"
        />
        <StatCard
          title="Canceladas"
          value={stats.canceled}
          valueClassName="text-red-600"
        />
      </div>

      <Modal
        isOpen={openEdit}
        title={editing ? `Editar Reserva #${editing.id}` : "Editar Reserva"}
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
