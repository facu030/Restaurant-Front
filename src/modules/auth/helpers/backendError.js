// Mapa de códigos de error del backend 
const ERROR_MESSAGES = {
  // Auth
  1000: 'Usuario y/o contraseña incorrectos',
  1001: 'El correo electrónico ya está registrado',
  1002: 'Usuario y/o contraseña incorrectos',
  1003: 'Tu cuenta fue suspendida. Contactá al administrador',
  // Reservas
  2000: 'El horario seleccionado ya no está disponible',
  2001: 'Ya tenés una reserva para esa fecha y horario',
  // Genérico
  default: 'Ocurrió un error inesperado. Intentá de nuevo',
};

const getErrorMessage = (error) => {
  // Primero intenta usar el código numérico del backend
  const code = error?.response?.data?.code;
  if (code && ERROR_MESSAGES[code]) {
    return ERROR_MESSAGES[code];
  }

  // Si no hay código, usa el mensaje directo del backend
  const backendMessage = error?.response?.data?.message;
  if (backendMessage) return backendMessage;

  // Fallback genérico
  return ERROR_MESSAGES.default;
};

export { getErrorMessage };