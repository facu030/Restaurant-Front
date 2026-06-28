
const StatCard = ({ title, value, icon, colorBg, colorText }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
      <div className={`p-3 rounded-full ${colorBg} ${colorText}`}>
        {icon}
      </div>
      
      <div>
        <p className="text-sm text-gray-500 font-medium dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-slate-100">{value}</p>
      </div>
    </div>
  );
};

const ReservationStatsCards = ({ stats }) => {
  const { total = 0, confirmed = 0, pending = 0, canceled = 0 } = stats || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      <StatCard 
        title="Total Reservas" 
        value={total}
        colorBg="bg-blue-50"
        colorText="text-blue-600"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        }
      />

      <StatCard 
        title="Confirmadas" 
        value={confirmed}
        colorBg="bg-green-50"
        colorText="text-green-600"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      <StatCard 
        title="Pendientes" 
        value={pending}
        colorBg="bg-amber-50"
        colorText="text-amber-600"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      <StatCard 
        title="Canceladas" 
        value={canceled}
        colorBg="bg-red-50"
        colorText="text-red-600"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  );
};

export default ReservationStatsCards;
