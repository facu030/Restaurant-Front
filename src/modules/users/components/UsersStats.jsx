import { useMemo } from 'react';

// Sub-componente tarjeta (para no repetir código HTML)
const StatCard = ({ title, value, color, icon }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between dark:border-slate-800 dark:bg-slate-900">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1 dark:text-slate-400">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100">{value}</h3>
    </div>
    <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
      {icon}
    </div>
  </div>
);

const UsersStats = ({ users = [] }) => {
  
  // Calculamos los números solo cuando la lista de usuarios cambie
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'Activo').length,
      suspended: users.filter(u => u.status === 'Suspendido').length,
      admins: users.filter(u => u.role === 'Admin').length,
    };
  }, [users]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      <StatCard 
        title="Total Usuarios" 
        value={stats.total} 
        color="bg-blue-100 text-blue-600"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        }
      />

      <StatCard 
        title="Usuarios Activos" 
        value={stats.active} 
        color="bg-green-100 text-green-600"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      <StatCard 
        title="Suspendidos" 
        value={stats.suspended} 
        color="bg-red-100 text-red-600"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        }
      />

      <StatCard 
        title="Administradores" 
        value={stats.admins} 
        color="bg-orange-100 text-orange-600"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        }
      />

    </div>
  );
};

export default UsersStats;
