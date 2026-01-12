import Card from '../../../shared/components/Card'; // Ajusta la ruta a tu shared

function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Resumen del Restaurante</h2>
      
      <div className='flex flex-col gap-4 sm:grid sm:grid-cols-3'>
        {/* KPI 1: Reservas Hoy (Mockup Pág 9) */}
        <Card className="p-4 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm uppercase">Reservas Hoy</h3>
          <p className="text-3xl font-bold text-gray-800">12</p>
          <span className="text-xs text-green-600">▲ 2 nuevas</span>
        </Card>

        {/* KPI 2: Próximos 7 días (Mockup Pág 9) */}
        <Card className="p-4 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm uppercase">Próximos 7 días</h3>
          <p className="text-3xl font-bold text-gray-800">45</p>
          <span className="text-xs text-gray-400">Mesas reservadas</span>
        </Card>

        {/* KPI 3: Usuarios Activos (Mockup Pág 9) */}
        <Card className="p-4 border-l-4 border-orange-500">
          <h3 className="text-gray-500 text-sm uppercase">Usuarios Activos</h3>
          <p className="text-3xl font-bold text-gray-800">128</p>
          <span className="text-xs text-green-600">▲ 5 registrados hoy</span>
        </Card>
      </div>

      {/* Aquí podrías agregar el gráfico o tabla de resumen más tarde */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Actividad Reciente</h3>
        <div className="bg-white p-4 rounded shadow h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
          Gráfico de reservas (Próximamente)
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;