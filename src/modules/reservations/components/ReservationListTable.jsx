function badgeClasses(status) {
  switch (status) {
    case "Confirmada":
      return "bg-green-100 text-green-700";
    case "Pendiente":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelada":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function ReservationListTable({
  reservations,
  onEdit,
  onDelete,
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full">
        <thead className="border-b text-left text-sm text-gray-500">
          <tr>
            <th className="px-3 py-2">ID</th>
            <th className="px-3 py-2">Cliente</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Fecha</th>
            <th className="px-3 py-2">Hora</th>
            <th className="px-3 py-2">Personas</th>
            <th className="px-3 py-2">Estado</th>
            <th className="px-3 py-2 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="border-b bg-white">
              <td className="px-3 py-3 font-medium">#{r.id ?? "-"}</td>

              <td className="px-3 py-3">{r.clientName ?? r.client ?? "-"}</td>

              <td className="px-3 py-3">{r.email ?? "-"}</td>

              <td className="px-3 py-3">{r.date ? formatDate(r.date) : "-"}</td>

              <td className="px-3 py-3">{r.time ?? "-"}</td>

              <td className="px-3 py-3">{r.pax ?? r.people ?? "-"}</td>

              <td className="px-3 py-3">
                {(() => {
                  const status = r.status ?? "Pendiente";
                  return (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  );
                })()}
              </td>

              <td className="px-3 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                    onClick={() => onEdit(r.id)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                    onClick={() => onDelete(r.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {!reservations.length && (
            <tr>
              <td
                colSpan={8}
                className="px-3 py-10 text-center text-sm text-gray-500"
              >
                No hay reservas para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
