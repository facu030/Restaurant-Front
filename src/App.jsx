import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./modules/auth/context/AuthProvider";
import ProtectedRoute from "./modules/auth/components/ProtectedRoute";

// Layouts
import AdminLayout from "./modules/shared/layouts/AdminLayout";
import PublicLayout from "./modules/shared/layouts/PublicLayout";

// Pages - Auth
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";

// Pages - Public / Client
import HomePage from "./modules/public/pages/HomePage";
import CreateReservationPage from "./modules/reservations/pages/CreateReservationPage";
import MisReservasPage from "./modules/reservations/pages/MisReservasPage";

// Pages - Admin
import ReservationsListPage from "./modules/admin/pages/ReservationsListPage";
import EditReservationPage from "./modules/admin/pages/EditReservationPage";
import DashboardPage from "./modules/admin/pages/DashboardPage";

import UsersPage from "./modules/users/pages/UsersPage";

// Error Components
function NotFound() {
  return (
    <div className="p-8 text-center text-white">
      <h2>404 - Página no encontrada</h2>
    </div>
  );
}

function RouterError() {
  return (
    <div className="p-8 text-center text-white">
      <h2>Ocurrió un error cargando la ruta</h2>
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />, // El Navbar se muestra en todas estas rutas
      errorElement: <RouterError />,
      children: [
        // 1. RUTAS PÚBLICAS (Accesibles para todos)
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "reservar",
          element: <CreateReservationPage />,
        },

        // 2. RUTAS DE CLIENTE PROTEGIDAS (Requieren Login, pero usan Navbar pública)
        {
          path: "mis-reservas",
          element: (
            <ProtectedRoute>
              <MisReservasPage />
            </ProtectedRoute>
          ),
        },
      ],
    },

    // 3. RUTAS DE AUTENTICACIÓN (Sin Navbar)
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },

    // 4. RUTAS DE ADMINISTRADOR (Protegidas + Layout Admin)
    {
      path: "/admin",
      element: (
        <ProtectedRoute requiredRole="Admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      errorElement: <RouterError />,
      children: [
        {
          path: "home",
          element: <DashboardPage>Dashboard con KPIs</DashboardPage>,
        },
        {
          path: "reservations",
          element: <ReservationsListPage />,
        },
        {
          path: "reservations/edit/:id",
          element: <EditReservationPage />,
        },
        {
          path: "usuarios",
          element: <UsersPage />,
        },
        // Redirección por defecto si entran a /admin sin nada más
        {
          index: true,
          element: <DashboardPage />,
        },
      ],
    },

    // Ruta comodín para 404
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
