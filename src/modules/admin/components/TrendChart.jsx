import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAdminTheme } from '../hooks/useAdminTheme';

const TrendChart = ({ data, title }) => {
  const { isDark } = useAdminTheme();
  const axisColor = isDark ? '#94a3b8' : '#9ca3af';
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.2)' : '#e5e7eb';
  const tooltipStyle = {
    backgroundColor: isDark ? '#0f172a' : '#fff',
    border: isDark ? '1px solid #334155' : 'none',
    borderRadius: '8px',
    boxShadow: isDark
      ? '0 10px 15px -3px rgb(0 0 0 / 0.35)'
      : '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    color: isDark ? '#e2e8f0' : '#111827',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-bold text-gray-800 mb-4 dark:text-slate-100">{title}</h3>
      
      <div className=" w-full">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReservas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: axisColor, fontSize: 12 }} 
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: axisColor, fontSize: 12 }} 
            />
            
            <Tooltip 
              contentStyle={tooltipStyle}
              labelStyle={{ color: isDark ? '#f8fafc' : '#111827' }}
            />
            
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#f97316" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorReservas)" 
              name="Reservas"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
