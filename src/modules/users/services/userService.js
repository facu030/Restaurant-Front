// Clave para guardar en el navegador
const USERS_STORAGE_KEY = 'cosa_nostra_users_data';
const DELAY = 500; // Simulamos medio segundo de carga de red

// Datos iniciales (Mock) basados en tu captura de pantalla
// Agregué uno "Suspendido" para que puedas probar los colores de los estados
const INITIAL_DATA = [
  { 
    id: 1, 
    name: 'Administrador', 
    email: 'admin@restaurant.com', 
    phone: '+1234567890', 
    role: 'Admin', 
    status: 'Activo' 
  },
  { 
    id: 2, 
    name: 'Juan Pérez', 
    email: 'juan@example.com', 
    phone: '+1234567891', 
    role: 'User', 
    status: 'Activo' 
  },
  { 
    id: 3, 
    name: 'María García', 
    email: 'maria@example.com', 
    phone: '+1234567892', 
    role: 'User', 
    status: 'Activo' 
  },
  { 
    id: 4, 
    name: 'Pedro Suspendido', 
    email: 'pedro@test.com', 
    phone: '+1234567000', 
    role: 'User', 
    status: 'Suspendido' 
  }
];

// Helper: Esperar un tiempo (simular API)
const wait = () => new Promise(resolve => setTimeout(resolve, DELAY));

// Helper: Obtener datos del localStorage o usar los iniciales
const getLocalData = () => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Si es la primera vez, guardamos los iniciales
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DATA));
  return INITIAL_DATA;
};

// Helper: Guardar datos
const saveLocalData = (data) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
};

// --- SERVICIOS EXPORTABLES ---

// 1. Obtener todos los usuarios
export const getAllUsers = async () => {
  await wait();
  const users = getLocalData();
  
  // Retornamos estructura típica de axios { data: ... }
  return { data: users, error: null };
};

// 2. Obtener un usuario por ID (útil para formulario de edición)
export const getUserById = async (id) => {
  await wait();
  const users = getLocalData();
  const user = users.find(u => u.id === id);
  
  if (!user) return { data: null, error: 'Usuario no encontrado' };
  return { data: user, error: null };
};

// 3. Crear usuario (simulado)
export const createUser = async (userData) => {
  await wait();
  const users = getLocalData();
  
  const newUser = {
    ...userData,
    id: Date.now(), // ID único basado en fecha
    status: 'Activo' // Por defecto
  };
  
  users.push(newUser);
  saveLocalData(users);
  
  return { data: newUser, error: null };
};

// 4. Actualizar usuario
export const updateUser = async (id, updatedFields) => {
  await wait();
  const users = getLocalData();
  
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return { data: null, error: 'Usuario no encontrado' };
  
  // Actualizamos solo los campos que vienen
  users[index] = { ...users[index], ...updatedFields };
  
  saveLocalData(users);
  return { data: users[index], error: null };
};

// 5. Eliminar usuario
export const deleteUser = async (id) => {
  await wait();
  let users = getLocalData();
  
  // Filtramos el que queremos borrar
  const initialLength = users.length;
  users = users.filter(u => u.id !== id);
  
  if (users.length === initialLength) {
    return { error: 'No se pudo eliminar el usuario' };
  }
  
  saveLocalData(users);
  return { data: true, error: null };
};