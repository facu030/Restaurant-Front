import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

// --- 1. DEFINICIÓN DE ÍCONOS (Solución para Vite) ---
// Al definirlos así, heredan el color del texto (currentColor), 
// permitiendo que tus clases 'hover:text-blue-600' funcionen.

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const SuspendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

const ActivateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

// --- COMPONENTE PRINCIPAL ---

const UsersTable = ({ users, onDelete, onStatusChange, onEdit }) => {

  const showConfirm = ({ title, message, confirmText, confirmColor, onConfirm }) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full border border-gray-100 text-left font-sans">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {message}
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className={`px-5 py-2 text-white font-bold rounded-lg shadow-md transition-transform transform active:scale-95 focus:outline-none ${confirmColor}`}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </button>
            </div>
          </div>
        );
      }
    });
  };

  const handleDelete = (user) => {
    showConfirm({
      title: 'Eliminar Usuario',
      message: `¿Estás seguro de que deseas eliminar permanentemente a ${user.name}? Esta acción no se puede deshacer.`,
      confirmText: 'Sí, Eliminar',
      confirmColor: 'bg-red-600 hover:bg-red-700',
      onConfirm: () => {
        if (onDelete) onDelete(user.id);
      }
    });
  };

  const handleStatus = (user) => {
    const esActivo = user.status === 'Activo';
    const nuevaAccion = esActivo ? 'Suspender' : 'Activar';
    
    showConfirm({
      title: `${nuevaAccion} Cuenta`,
      message: `¿Confirmas que deseas ${nuevaAccion.toLowerCase()} el acceso de ${user.name}?`,
      confirmText: `Sí, ${nuevaAccion}`,
      confirmColor: esActivo ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700',
      onConfirm: () => {
        if (onStatusChange) onStatusChange(user.id, nuevaAccion);
      }
    });
  };

  const handleEdit = (user) => {
    if (onEdit) onEdit(user);
  };

  if (!users || users.length === 0) return <div className="p-8 text-center text-gray-500">No hay usuarios registrados.</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
            <th className="p-4">ID</th>
            <th className="p-4">Nombre</th>
            <th className="p-4">Email</th>
            <th className="p-4">Teléfono</th>
            <th className="p-4">Rol</th>
            <th className="p-4">Estado</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-900">#{user.id}</td>
              <td className="p-4 font-semibold">{user.name}</td>
              <td className="p-4 text-gray-500">{user.email}</td>
              <td className="p-4 text-gray-500">{user.phone}</td>
              <td className="p-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  user.role === 'Admin' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="p-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  user.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {user.status}
                </span>
              </td>
              
              <td className="p-4 flex gap-2 justify-end">
                <button
                    onClick={() => handleEdit(user)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                >
                    <EditIcon />
                </button>
                
                <button
                    onClick={() => handleStatus(user)}
                    className={`p-2 rounded-lg transition-colors ${
                        user.status === 'Activo' 
                        ? 'text-gray-400 hover:text-amber-600 hover:bg-amber-50' 
                        : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                    }`}
                    title={user.status === 'Activo' ? "Suspender" : "Activar"}
                >
                    {user.status === 'Activo' ? <SuspendIcon /> : <ActivateIcon />}
                </button>

                <button
                    onClick={() => handleDelete(user)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                >
                    <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;