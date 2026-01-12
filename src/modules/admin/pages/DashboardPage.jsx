import { useState, useEffect } from 'react';
import Card from '../../shared/components/Card'; 
import TrendChart from '../../admin/components/TrendChart'; 
import PeakHoursChart from '../../admin/components/PeakHoursChart'; 
import { getReservationStats, getPeakHoursData } from '../../reservations/services/statsService'; 

function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState('year'); 
  const [trendData, setTrendData] = useState([]);
  const [peakData, setPeakData] = useState([]);

  useEffect(() => {
    setTrendData(getReservationStats(timeFilter));
    setPeakData(getPeakHoursData());
  }, [timeFilter]);

  const getChartTitle = () => {
    if (timeFilter === 'day') return 'Reservas por Hora (Hoy)';
    if (timeFilter === 'month') return 'Evolución Semanal';
    return 'Tendencia Anual';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Resumen del Restaurante</h2>
        
        <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200 flex">
          {[
            { key: 'day', label: 'Hoy' },
            { key: 'month', label: 'Este Mes' },
            { key: 'year', label: 'Año' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setTimeFilter(filter.key)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                timeFilter === filter.key
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* --- KPI CARDS (Tus tarjetas existentes) --- */}
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 mb-8">
        {/* KPI 1 */}
        <Card className="p-4 border-l-4 border-blue-500 bg-white shadow-sm">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Reservas Hoy</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-800">12</p>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">▲ 2 nuevas</span>
          </div>
        </Card>

        {/* KPI 2 */}
        <Card className="p-4 border-l-4 border-purple-500 bg-white shadow-sm"> {/* Cambié border-accent a purple si no tienes accent definido */}
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Próximos 7 días</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-800">45</p>
            <span className="text-xs text-gray-400">Mesas reservadas</span>
          </div>
        </Card>

        {/* KPI 3 */}
        <Card className="p-4 border-l-4 border-orange-500 bg-white shadow-sm">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Usuarios Activos</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-800">128</p>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">▲ 5 hoy</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2">
          <TrendChart 
            title={getChartTitle()} 
            data={trendData} 
          />
        </div>

        <div className="lg:col-span-1 h-full">
          <PeakHoursChart data={peakData} />
        </div>
        
      </div>
    </div>
  );
};

export default DashboardPage;