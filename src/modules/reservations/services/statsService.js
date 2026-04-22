import { instance } from '../../shared/api/axiosInstance';

// ADMIN — stats para las cards del dashboard (total, confirmadas, pendientes, canceladas)
export const getReservationStats = async () => {
  try {
    const { data } = await instance.get('/api/reservations/stats');
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || 'Error al cargar estadísticas' };
  }
};

// ADMIN — datos para el gráfico de tendencia (por período: day/month/year)
export const getTrendData = async (period = 'month') => {
  try {
    const { data } = await instance.get('/api/reservations/stats/trend', { params: { period } });
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || 'Error al cargar tendencia' };
  }
};

// ADMIN — datos para el gráfico de horas pico
export const getPeakHoursData = async () => {
  try {
    const { data } = await instance.get('/api/reservations/stats/peak-hours');
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || 'Error al cargar horas pico' };
  }
};