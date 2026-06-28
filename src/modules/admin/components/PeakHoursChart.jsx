import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';
import { useAdminTheme } from '../hooks/useAdminTheme';

const PeakHoursChart = ({ data }) => {
  const { isDark } = useAdminTheme();
  const axisColor = isDark ? '#94a3b8' : '#9ca3af';
  const tooltipStyle = {
    backgroundColor: isDark ? '#0f172a' : '#fff',
    border: isDark ? '1px solid #334155' : 'none',
    borderRadius: '8px',
    boxShadow: isDark
      ? '0 10px 15px -3px rgb(0 0 0 / 0.35)'
      : '0 4px 6px -1px rgba(0,0,0,0.1)',
    color: isDark ? '#e2e8f0' : '#111827',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-bold text-gray-800 mb-2 dark:text-slate-100">Horas Pico</h3>
      <p className="text-xs text-gray-400 mb-6 dark:text-slate-400">Promedio de ocupación por horario</p>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={30}>
            
            <XAxis 
              dataKey="hour" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: axisColor, fontSize: 11 }}
              dy={10}
            />
            
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={tooltipStyle}
              labelStyle={{ color: isDark ? '#f8fafc' : '#111827' }}
            />
            
            <Bar 
              dataKey="total" 
              name="Reservas" 
              radius={[6, 6, 0, 0]} 
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.total >= 40 ? '#ea580c' : isDark ? '#fb923c' : '#fdba74'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeakHoursChart;
