import { instance } from '../../../shared/api/axiosInstance';

export const updateUser = async (id, updatedData) => {
  try {
    const { data } = await instance.put(`/api/users/${id}`, updatedData);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || 'Error al actualizar usuario' };
  }
};

export const suspendUser = async (id) => {
  try {
    const { data } = await instance.patch(`/api/users/${id}/suspend`);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || 'Error al suspender usuario' };
  }
};

export const deleteUser = async (id) => {
  try {
    await instance.delete(`/api/users/${id}`);
    return { data: true, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || 'Error al eliminar usuario' };
  }
};