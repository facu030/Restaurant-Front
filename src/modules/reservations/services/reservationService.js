import { instance } from '../../shared/api/axiosInstance';

const normalizeReservationError = (err, fallbackMessage) => ({
  message: err.response?.data?.message || fallbackMessage,
  status: err.response?.status,
  details: err.response?.data?.details || null,
});

// PÚBLICO — horarios disponibles
export const getAvailableSlots = async (date) => {
  try {
    const { data } = await instance.get('/api/reservations/slots', { params: { date } });
    return { data, error: null };
  } catch (err) {
    return { data: null, error: normalizeReservationError(err, 'No se pudieron cargar los horarios') };
  }
};

// PÚBLICO — crear reserva
export const createReservation = async (reservationData) => {
  try {
    const { data } = await instance.post('/api/reservations', reservationData);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: normalizeReservationError(err, 'Error al crear la reserva') };
  }
};

// USUARIO — mis reservas (el back filtra por token)
export const getMyReservations = async () => {
  try {
    const { data } = await instance.get('/api/reservations/my-reservations');
    return { data, error: null };
  } catch (err) {
    return { data: null, error: normalizeReservationError(err, 'Error al cargar tus reservas') };
  }
};

// USUARIO — cancelar su propia reserva
export const cancelMyReservation = async (id) => {
  try {
    const { data } = await instance.patch(`/api/reservations/${id}/cancel`);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: normalizeReservationError(err, 'No se pudo cancelar la reserva') };
  }
};

// ADMIN — listar todas las reservas
export const getReservations = async () => {
  try {
    const { data } = await instance.get('/api/reservations');
    return { data, error: null };
  } catch (err) {
    return { data: null, error: normalizeReservationError(err, 'Error al cargar reservas') };
  }
};

// ADMIN — obtener una reserva por ID
export const getReservationById = async (id) => {
  try {
    const { data } = await instance.get(`/api/reservations/${id}`);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: normalizeReservationError(err, 'Reserva no encontrada') };
  }
};

// ADMIN — editar reserva completa
export const updateReservation = async (id, updatedData) => {
  try {
    const { data } = await instance.put(`/api/reservations/${id}`, updatedData);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: normalizeReservationError(err, 'Error al actualizar la reserva') };
  }
};

// ADMIN — cambiar solo el estado (Confirmada/Cancelada/Pendiente)
export const updateReservationStatus = async (id, status) => {
  try {
    const { data } = await instance.patch(`/api/reservations/${id}`, { status });
    return { data, error: null };
  } catch (err) {
    return { data: null, error: normalizeReservationError(err, 'No se pudo actualizar el estado') };
  }
};

// ADMIN — eliminar reserva
export const deleteReservation = async (id) => {
  try {
    await instance.delete(`/api/reservations/${id}`);
    return { data: true, error: null };
  } catch (err) {
    return { data: null, error: normalizeReservationError(err, 'Error al eliminar la reserva') };
  }
};    
