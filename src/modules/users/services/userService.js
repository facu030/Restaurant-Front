import { instance } from "../../shared/api/axiosInstance";

export const getAllUsers = async () => {
  try {
    const { data } = await instance.get("/api/users");
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || "Error al cargar usuarios",
    };
  }
};

export const getUserById = async (id) => {
  try {
    const { data } = await instance.get(`/api/users/${id}`);
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || "Usuario no encontrado",
    };
  }
};

export const updateUser = async (id, updatedFields) => {
  try {
    const { data } = await instance.put(`/api/users/${id}`, updatedFields);
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || "Error al actualizar usuario",
    };
  }
};

export const suspendUser = async (id) => {
  try {
    const { data } = await instance.patch(`/api/users/${id}/suspend`);
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || "Error al suspender usuario",
    };
  }
};

export const activateUser = async (id) => {
  try {
    const { data } = await instance.patch(`/api/users/${id}/activate`);
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || "Error al activar usuario",
    };
  }
};

export const deleteUser = async (id) => {
  try {
    await instance.delete(`/api/users/${id}`);
    return { data: true, error: null };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || "Error al eliminar usuario",
    };
  }
};

export const getMe = async () => {
  try {
    const { data } = await instance.get("/api/users/me");
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || "Error" };
  }
};
