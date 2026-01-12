
// src/modules/reservations/services/reservationService.js
import api from '../../../api/axios'; // Importamos la instancia configurada

// ==========================================
// 🌎 SECCIÓN PÚBLICA (Cualquier usuario)
// ==========================================

/**
 * Obtiene los horarios disponibles desde el Backend
 * GET /api/reservations/slots?date=2026-01-20
 */
export const getAvailableSlots = async (date) => {
  try {
    // Axios se encarga de convertir { date } a ?date=...
    const response = await api.get('/reservations/slots', {
      params: { date }
    });

    // El backend devuelve: ["20:00", "20:30", ...]
    return { data: response.data, error: null };
  } catch (err) {
    console.error("Error fetching slots:", err);
    return { 
      data: null, 
      error: { message: "No se pudieron cargar los horarios. Intente recargar." } 
    };
  }
};

/**
 * Crea una nueva reserva en la Base de Datos
 * POST /api/reservations
 */
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservations', reservationData);
    
    // El backend devuelve la reserva creada con su ID real de Mongo
    return { data: response.data, error: null };

  } catch (err) {
    // Manejo robusto de errores del Backend
    const status = err.response?.status;
    let errorMessage = "Ocurrió un error al procesar la reserva";

    if (status === 409) {
      // 409 Conflict: El backend detectó duplicado en la DB
      errorMessage = "Lo sentimos, ese horario acaba de ser ocupado por otra persona.";
    } else if (err.response?.data?.message) {
      // Mensaje personalizado del backend (ej: "Email inválido")
      errorMessage = err.response.data.message;
    }

    return { 
      data: null, 
      error: { message: errorMessage, status } 
    };
  }
};


// ==========================================
// 🔒 SECCIÓN ADMIN (Protegida)
// ==========================================

/**
 * Obtiene todas las reservas para el panel de administración
 * GET /api/reservations
 */
export const getReservations = async () => {
  try {
    // El token se envía solo gracias al interceptor en axios.js
    const response = await api.get('/reservations');
    
    return { data: response.data, error: null };
  } catch (err) {
    return { 
      data: null, 
      error: { message: err.response?.data?.message || "Error al cargar reservas" } 
    };
  }
};

/**
 * Actualiza el estado de una reserva (Confirmar/Cancelar)
 * PATCH /api/reservations/:id
 */
export const updateReservationStatus = async (id, status) => {
  try {
    const response = await api.patch(`/reservations/${id}`, { status });
    
    return { data: response.data, error: null };
  } catch (err) {
    return { 
      data: null, 
      error: { message: "No se pudo actualizar el estado" } 
    };
  }
};

/**
 * Elimina una reserva físicamente
 * DELETE /api/reservations/:id
 */
export const deleteReservation = async (id) => {
  try {
    await api.delete(`/reservations/${id}`);
    
    return { data: true, error: null };
  } catch (err) {
    return { 
      data: null, 
      error: { message: "Error al eliminar la reserva" } 
    };
  }
};
