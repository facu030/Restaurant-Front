import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./modules/auth/context/AuthProvider";
import ProtectedRoute from "./modules/auth/components/ProtectedRoute";

import AdminLayout from "./modules/shared/layouts/AdminLayout";
import PublicLayout from "./modules/shared/layouts/PublicLayout";

import LoginPage from "./modules/auth/pages/LoginPage";
import HomePage from "./modules/public/pages/HomePage";

function NotFound() {
  return <h2 style={{ padding: 24 }}>404 - Página no encontrada</h2>;
}

function RouterError() {
  return <h2 style={{ padding: 24 }}>Ocurrió un error cargando la ruta</h2>;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      errorElement: <RouterError />,
      children: [
        { index: true, element: <HomePage /> },
      ],
    },

    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <>Aquí va el Registro</> },

    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      errorElement: <RouterError />,
      children: [
        { index: true, element: <>Aquí van los gráficos (KPIs)</> },
        { path: "users", element: <>Gestión de Usuarios</> },
        { path: "reservations", element: <>Gestión de Reservas</> },
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;