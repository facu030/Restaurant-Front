/*import { instance } from '../../shared/api/axiosInstance';

export const login = async (username, password) => {
  const response = await instance.post('api/auth/login', { username, password });

  return { data: response.data.token, error: null };
}; */

export const login = async (username, password) => {
  await new Promise((r) => setTimeout(r, 300));

  // usuarios mock con rol
  const users = [
    { username: "admin", password: "admin123", role: "Admin" },
    { username: "user", password: "user123", role: "User" },
  ];

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return { data: null, error: "Credenciales inválidas" };
  }

  // token mock (string) + role
  const token = btoa(JSON.stringify({ sub: username, iat: Date.now() }));

  return { data: { token, role: user.role, username: user.username }, error: null };
};