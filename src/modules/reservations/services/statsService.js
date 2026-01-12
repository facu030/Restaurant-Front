// Simulación de datos que vendrían del Backend
// Estructura: name (Eje X), value (Eje Y - Cantidad de reservas)

export const getReservationStats = (period) => {
  switch (period) {
    case 'day': // Ejemplo: Reservas por hora (para el filtro "Hoy")
      return [
        { name: '12:00', value: 2 },
        { name: '13:00', value: 5 },
        { name: '14:00', value: 8 }, // Hora pico
        { name: '15:00', value: 3 },
        { name: '19:00', value: 6 },
        { name: '20:00', value: 12 }, // Hora pico cena
        { name: '21:00', value: 10 },
        { name: '22:00', value: 4 },
      ];
    
    case 'month': // Ejemplo: Reservas por día (para el filtro "Este Mes")
      return [
        { name: 'Sem 1', value: 45 },
        { name: 'Sem 2', value: 52 },
        { name: 'Sem 3', value: 38 },
        { name: 'Sem 4', value: 65 },
      ];

    case 'year': // Ejemplo: Reservas por mes (para el filtro "Año")
      return [
        { name: 'Ene', value: 120 },
        { name: 'Feb', value: 132 },
        { name: 'Mar', value: 101 },
        { name: 'Abr', value: 134 },
        { name: 'May', value: 90 },
        { name: 'Jun', value: 230 },
        { name: 'Jul', value: 210 },
        { name: 'Ago', value: 180 },
        { name: 'Sep', value: 150 },
        { name: 'Oct', value: 170 },
        { name: 'Nov', value: 190 },
        { name: 'Dic', value: 300 }, // Fiestas
      ];

    default:
      return [];
  }
  
};

export const getPeakHoursData = () => {
  return [
    { hour: '18:00', total: 12 },
    { hour: '19:00', total: 25 },
    { hour: '20:00', total: 45 }, // Pico máximo
    { hour: '21:00', total: 40 },
    { hour: '22:00', total: 20 },
    { hour: '23:00', total: 8 },
  ];
};