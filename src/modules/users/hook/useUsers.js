import { useState, useEffect } from 'react';
import { 
  getAllUsers, 
  deleteUser as deleteUserService, 
  updateUser 
} from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Cargar usuarios al inicio
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await getAllUsers();
    if (error) {
      setError(error);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  // 2. Función para eliminar (Conecta con tu botón rojo)
  const handleDeleteUser = async (id) => {
    // Llamamos al servicio
    const { error } = await deleteUserService(id);
    
    if (error) {
      alert("Error al eliminar: " + error);
    } else {
      // Actualizamos el estado local filtrando el usuario eliminado
      // (Así la interfaz responde rápido sin recargar toda la lista)
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    }
  };

  // 3. Función para cambiar estado (Conecta con suspender/activar)
  const handleStatusChange = async (id, nuevaAccion) => {
    // Definimos el nuevo status string basado en la acción
    const newStatus = nuevaAccion === 'Suspender' ? 'Suspendido' : 'Activo';
    
    // Llamamos al servicio para guardar en "BD"
    const { error } = await updateUser(id, { status: newStatus });

    if (error) {
      alert("Error al actualizar: " + error);
    } else {
      // Actualizamos el estado local buscando el usuario y cambiándole el campo
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === id ? { ...user, status: newStatus } : user
      ));
    }
  };

  return {
    users,
    loading,
    error,
    handleDeleteUser,
    handleStatusChange,
    refreshUsers: fetchUsers
  };
};