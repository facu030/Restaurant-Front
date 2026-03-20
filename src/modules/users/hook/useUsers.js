import { useState, useEffect } from 'react';
import {
  getAllUsers,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  suspendUser,
  activateUser,
} from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await getAllUsers();
    if (error) setError(error);
    else setUsers(data);
    setLoading(false);
  };

  const handleDeleteUser = async (id) => {
    const { error } = await deleteUserService(id);
    if (error) {
      alert('Error al eliminar: ' + error);
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Suspender/Activar — llama al endpoint correcto según estado actual
  const handleStatusChange = async (id, accion) => {
    const { data, error } = accion === 'Suspender'
      ? await suspendUser(id)
      : await activateUser(id);

    if (error) {
      alert('Error al actualizar estado: ' + error);
      return;
    }

    // Actualizamos el estado local con lo que devuelve el back
    setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
  };

  const updateUser = async (id, formData) => {
    const { data, error } = await updateUserService(id, formData);
    if (error) {
      alert('Error al actualizar: ' + error);
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
  };

  const createUser = async (formData) => {
    const { data, error } = await createUserService(formData);
    if (error) {
      alert('Error al crear usuario: ' + error);
      return;
    }
    setUsers((prev) => [...prev, data]);
  };

  return {
    users,
    loading,
    error,
    handleDeleteUser,
    handleStatusChange,
    updateUser,
    createUser,
    refreshUsers: fetchUsers,
  };
};