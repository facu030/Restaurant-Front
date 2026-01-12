// --- 1. CONFIGURACIÓN DEL MOCK (Simulación de Base de Datos) ---
const STORAGE_KEY = "cosa_nostra_reservations_db";
const DELAY_MS = 600; // Simulamos retardo de red

const seedData = [
  { id: 1, clientName: "Juan Pérez", email: "juan@test.com", date: "2026-01-20", time: "20:00", pax: 4, status: "Confirmada" },
  { id: 2, clientName: "Maria Garcia", email: "maria@test.com", date: "2026-01-21", time: "21:30", pax: 2, status: "Pendiente" },
  { id: 3, clientName: "Carlos Lopez", email: "carlos@test.com", date: "2026-01-20", time: "21:00", pax: 6, status: "Cancelada" },
];

// Helper para leer "Base de Datos"
const readDB = () => {
  const local = localStorage.getItem(STORAGE_KEY);
  if (!local) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
  }
  return JSON.parse(local);
};

// Helper para escribir "Base de Datos"
const writeDB = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Helper para simular espera (fetch)
const wait = () => new Promise((res) => setTimeout(res, DELAY_MS));


// ==========================================
// 🌎 SECCIÓN PÚBLICA (Cliente)
// ==========================================

/**
 * Obtiene los horarios disponibles para una fecha
 * Lógica: Devuelve horarios fijos filtrando los que ya están ocupados en la DB
 */
export const getAvailableSlots = async (date) => {
  await wait(); // Simulamos loading
  
  try {
    const db = readDB();
    
    // Todos los horarios posibles del restaurante
    const allSlots = [
      "12:00", "12:30", "13:00", "13:30", "14:00", // Almuerzo
      "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30" // Cena
    ];

    // Buscamos cuáles ya están reservados para esa fecha
    const reservedTimes = db
      .filter(r => r.date === date && r.status !== 'Cancelada')
      .map(r => r.time);

    // Filtramos (Esta es una lógica simple, luego el backend hará esto)
    // Supongamos que hay 5 mesas por turno. Si hay reserva, no bloqueamos a menos que se llene.
    // Para simplificar ahora: Si ya hay reserva exacta, la dejamos pasar (multimesa) 
    // o la bloqueamos si quieres probar validaciones.
    
    return { data: allSlots, error: null };
  } catch (error) {
    return { data: null, error: "Error al cargar horarios" };
  }
};

/**
 * Crea una nueva reserva
 */
export const createReservation = async (reservationData) => {
  await wait();

  try {
    const db = readDB();

    // 1. Simulación de Validación Backend (Evitar duplicados o reglas de negocio)
    // Ejemplo: No permitir más de 10 reservas el mismo día
    const countToday = db.filter(r => r.date === reservationData.date).length;
    if (countToday >= 20) {
      return { data: null, error: { message: "Lo sentimos, no hay más mesas para este día." } };
    }

    // 2. Crear objeto
    const newId = db.length > 0 ? Math.max(...db.map(r => r.id)) + 1 : 1;
    const newReservation = {
      id: newId,
      ...reservationData,
      status: "Pendiente", // Por defecto
      createdAt: new Date().toISOString()
    };

    // 3. Guardar
    writeDB([...db, newReservation]);

    return { data: newReservation, error: null };

  } catch (error) {
    return { data: null, error: { message: "Error interno del servidor" } };
  }
};


// ==========================================
// 🔒 SECCIÓN ADMIN (Requiere Auth en el futuro)
// ==========================================

/**
 * Lista todas las reservas (con filtros opcionales)
 * Equivalente a tu fetch('/api/orders')
 */
export const getReservations = async () => {
  await wait();

  try {
    // AQUI EN EL FUTURO IRÁ TU FETCH CON TOKEN
    /*
    const response = await fetch('/api/reservations', {
       headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    ...
    */
    
    const data = readDB();
    // Ordenar por fecha más reciente
    const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return { data: sorted, error: null };

  } catch (error) {
    console.error(error);
    return { data: null, error: { message: "No se pudieron cargar las reservas" } };
  }
};

/**
 * Obtiene estadísticas para el Dashboard
 */
export const getReservationStats = async () => {
  await wait();
  
  try {
    const db = readDB();
    
    const stats = {
      total: db.length,
      confirmed: db.filter(r => r.status === 'Confirmada').length,
      pending: db.filter(r => r.status === 'Pendiente').length,
      canceled: db.filter(r => r.status === 'Cancelada').length,
    };

    return { data: stats, error: null };
  } catch (error) {
    return { data: null, error: { message: "Error calculando estadísticas" } };
  }
};

/**
 * Actualiza el estado de una reserva (Ej: Confirmar/Cancelar)
 */
export const updateReservationStatus = async (id, newStatus) => {
  await wait();

  try {
    const db = readDB();
    const index = db.findIndex(r => r.id === Number(id));

    if (index === -1) {
      return { data: null, error: { message: "Reserva no encontrada" } };
    }

    db[index].status = newStatus;
    writeDB(db);

    return { data: db[index], error: null };
  } catch (error) {
    return { data: null, error: { message: "No se pudo actualizar la reserva" } };
  }
};

/**
 * Elimina una reserva
 */
export const deleteReservation = async (id) => {
  await wait();

  try {
    const db = readDB();
    const filtered = db.filter(r => r.id !== Number(id));
    
    if (db.length === filtered.length) {
      return { data: null, error: { message: "No se encontró la reserva para eliminar" } };
    }

    writeDB(filtered);
    return { data: true, error: null }; // Retorna true si borró ok
  } catch (error) {
    return { data: null, error: { message: "Error al eliminar" } };
  }
};

export const getReservationById = async (id) => {
  await wait();

  try {
    const db = readDB();
    // Importante: Convertimos 'id' a Number porque params de URL son string
    const reservation = db.find(r => r.id === Number(id));

    if (!reservation) {
      return { data: null, error: { message: "Reserva no encontrada" } };
    }

    return { data: reservation, error: null };
  } catch (error) {
    return { data: null, error: { message: "Error al cargar la reserva" } };
  }
};

export const updateReservation = async (id, updatedData) => {
  await wait();

  try {
    const db = readDB();
    const index = db.findIndex(r => r.id === Number(id));

    if (index === -1) {
      return { data: null, error: { message: "Reserva no encontrada" } };
    }

    // Fusionamos los datos existentes con los nuevos cambios
    // (Mantenemos el ID original y el createdAt)
    const updatedReservation = { 
      ...db[index], 
      ...updatedData, 
      id: Number(id) // Aseguramos que el ID no cambie
    };

    db[index] = updatedReservation;
    writeDB(db);

    return { data: updatedReservation, error: null };
  } catch (error) {
    return { data: null, error: { message: "Error al guardar los cambios" } };
  }
};

/**
 * Obtiene las reservas de un usuario específico por su email
 */
export const getUserReservations = async (email) => {
  // Simulamos espera de red (si usas el mock) o llamamos a la API real
  // await wait(); // Si usas el mock de wait()
  
  try {
    // --- OPCIÓN A: Si usas Mock (LocalStorage) ---
    /*
    const db = getDB(); // Tu función helper que lee localStorage
    const userReservations = db.filter(r => r.email === email);
    // Ordenar: Las más futuras primero
    const sorted = userReservations.sort((a, b) => new Date(b.date) - new Date(a.date));
    return { data: sorted, error: null };
    */

    // --- OPCIÓN B: Si ya estás con Axios (Backend) ---
    // El backend debería filtrar automáticamente basado en el Token, 
    // pero si lo haces por query param sería así:
    const response = await api.get('/reservations/my-reservations', { params: { email } });
    return { data: response.data, error: null };

  } catch (err) {
    console.error(err);
    return { data: [], error: { message: "Error al cargar tus reservas" } };
  }
};

/**
 * Cancelar una reserva (Opcional, pero útil para el usuario)
 */
export const cancelUserReservation = async (id) => {
    try {
        // Mock o API Call
        // const response = await api.patch(`/reservations/${id}/cancel`);
        // return { data: true, error: null };
        
        // Mock rápido:
        const db = getDB();
        const index = db.findIndex(r => r.id === id);
        if (index !== -1) {
            db[index].status = 'Cancelada';
            saveDB(db);
        }
        return { data: true, error: null };
    } catch (error) {
        return { data: null, error: { message: "No se pudo cancelar" } };
    }
}