import { useState, useEffect } from "react";
import {
  getAllUsers,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  suspendUser,
  activateUser,
} from "../services/userService";

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
      alert("Error al eliminar: " + error);
      return;
    }
    setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
  };

  const handleStatusChange = async (id, accion) => {
    const { data, error } =
      accion === "Suspender" ? await suspendUser(id) : await activateUser(id);

    if (error) {
      alert("Error al actualizar estado: " + error);
      return;
    }

    setUsers((prev) =>
      prev.map((u) => ((u._id || u.id) === id ? data.user || data : u)),
    );
  };

  const updateUser = async (id, formData) => {
    const { data, error } = await updateUserService(id, formData);
    if (error) {
      alert("Error al actualizar: " + error);
      return false;
    }

    const updatedUser = data.data || data.user || data;
    setUsers((prev) =>
      prev.map((u) => ((u._id || u.id) === id ? updatedUser : u)),
    );
    return true;
  };

  return {
    users,
    loading,
    error,
    handleDeleteUser,
    handleStatusChange,
    updateUser,
    refreshUsers: fetchUsers,
  };
};
