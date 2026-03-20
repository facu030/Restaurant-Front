import { instance } from '../../../shared/api/axiosInstance';

export const getUsers = async () => {
  try {
    const { data } = await instance.get('/api/users');
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || 'Error al cargar usuarios' };
  }
};

export const getUserById = async (id) => {
  try {
    const { data } = await instance.get(`/api/users/${id}`);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || 'Usuario no encontrado' };
  }
};