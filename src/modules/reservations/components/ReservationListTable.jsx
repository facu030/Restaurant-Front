import "react-confirm-alert/src/react-confirm-alert.css";

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
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("es-AR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ReservationListTable({
  reservations,
  onEdit,
  onDelete,
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead className="border-b border-gray-200 text-left text-sm text-gray-500 dark:border-slate-800 dark:text-slate-400">
          <tr>
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
            <tr
              key={r.id || r._id}
              className="border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/70"
            >
              <td className="px-3 py-3 font-semibold dark:text-slate-100">
                {r.clientName ?? r.client ?? "-"}
              </td>
              <td className="px-3 py-3 text-gray-500 dark:text-slate-400">{r.email ?? "-"}</td>
              <td className="px-3 py-3">{r.date ? formatDate(r.date) : "-"}</td>
              <td className="px-3 py-3">{r.time ?? "-"}</td>
              <td className="px-3 py-3">{r.pax ?? r.people ?? "-"}</td>
              <td className="px-3 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClasses(r.status ?? "Pendiente")}`}
                >
                  {r.status ?? "Pendiente"}
                </span>
              </td>

              <td className="px-3 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:text-slate-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
                    onClick={() => onEdit(r._id || r.id)}
                    title="Editar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>

                  <button
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                    onClick={() => onDelete(r._id || r.id)}
                    title="Eliminar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {!reservations.length && (
            <tr>
              <td
                colSpan={7}
                className="px-3 py-10 text-center text-sm text-gray-500 dark:text-slate-400"
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
