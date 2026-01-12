function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

export default function ReservationStatsCards({ total, confirmed, pending, canceled }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-4">
      <StatCard title="Total Reservas" value={total} />
      <StatCard title="Confirmadas" value={confirmed} />
      <StatCard title="Pendientes" value={pending} />
      <StatCard title="Canceladas" value={canceled} />
    </div>
  );
}
