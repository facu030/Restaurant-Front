import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css'; 

const CalendarSelector = ({ selectedDate, onSelect, disabledDates = [] }) => {
  return (
    <div className="flex flex-col items-center">
      
      {/* Visualizador de fecha */}
      <div className="mb-4 text-center">
        <span className="text-gray-400 text-xs uppercase tracking-widest">
          Fecha Seleccionada
        </span>
        <p className="text-2xl font-serif font-bold text-white capitalize mt-1">
          {selectedDate 
            ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: es }) 
            : "Selecciona un día"}
        </p>
      </div>

      {/* Calendario */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-600 shadow-inner">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          locale={es}
          
          disabled={[
            { before: new Date() }, 
            ...disabledDates 
          ]}

          showOutsideDays={true}
          fixedWeeks 
          
          modifiersClassNames={{
            disabled: 'text-slate-600 opacity-25 cursor-not-allowed',
          }}
        />
      </div>
    </div>
  );
};

export default CalendarSelector;