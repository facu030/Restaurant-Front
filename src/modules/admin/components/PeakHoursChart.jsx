import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

const PeakHoursChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Horas Pico</h3>
      <p className="text-xs text-gray-400 mb-6">Promedio de ocupación por horario</p>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={30}>
            
            <XAxis 
              dataKey="hour" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              dy={10}
            />
            
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            
            <Bar 
              dataKey="total" 
              name="Reservas" 
              radius={[6, 6, 0, 0]} 
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.total >= 40 ? '#ea580c' : '#fdba74'} 
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