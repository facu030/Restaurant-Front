import { instance } from '../../shared/api/axiosInstance';

const authService = {
  login: async (username, password) => {
    const { data } = await instance.post('/api/auth/login', { username, password });
    return data; // { token, user: { userName, role, ... } }
  },

  register: async (username, email, password, phone = '') => {
    const { data } = await instance.post('/api/auth/register', { username, email, password, phone });
    return data; // { token, user: { userName, role, ... } }
  },
};

export default authService;
