/*import { instance } from '../../shared/api/axiosInstance';

export const login = async (username, password) => {
  const response = await instance.post('api/auth/login', { username, password });

  return { data: response.data.token, error: null };
}; */

export const login = async (username, password) => {
  await new Promise((r) => setTimeout(r, 300));

  // usuarios mock
  const users = [
    { username: "admin", password: "admin123" },
    { username: "user", password: "user123" },
  ];

  const ok = users.some((u) => u.username === username && u.password === password);

  if (!ok) {
    return { data: null, error: "Credenciales inválidas" };
  }

  // token mock (string)
  const token = btoa(JSON.stringify({ sub: username, iat: Date.now() }));

  return { data: token, error: null };
};