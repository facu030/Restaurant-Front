import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./modules/auth/context/AuthProvider";
import ProtectedRoute from "./modules/auth/components/ProtectedRoute";

import PublicLayout from "./shared/layouts/PublicLayout";
import AdminLayout from "./shared/layouts/AdminLayout";

import LoginPage from "./modules/auth/pages/LoginPage";
import HomePage from "./modules/public/pages/HomePage";

// Pages placeholders (descomentá cuando existan)
// import RegisterPage from "./modules/auth/pages/RegisterPage";
// import NewReservationPage from "./modules/reservations/pages/NewReservationPage";
// import DashboardPage from "./modules/admin/pages/DashboardPage";
// import ManageUsersPage from "./modules/admin/pages/ManageUsersPage";
// import ManageReservationsPage from "./modules/admin/pages/ManageReservationsPage";

function NotFound() {
  return <h2 style={{ padding: 24 }}>404 - Página no encontrada</h2>;
}

function RouterError() {
  return <h2 style={{ padding: 24 }}>Ocurrió un error cargando la ruta</h2>;
}

function App() {
  const router = createBrowserRouter([
    // PUBLIC (Navbar + Footer)
    {
      path: "/",
      element: <PublicLayout />,
      errorElement: <RouterError />,
      children: [
        { index: true, element: <HomePage /> },

        { path: "about", element: <>Aquí va Quiénes Somos</> },
        { path: "contact", element: <>Aquí va Contacto</> },

        // reservar requiera login:
        // {
        //   path: "reservar",
        //   element: (
        //     <ProtectedRoute>
        //       <NewReservationPage />
        //     </ProtectedRoute>
        //   ),
        // },

        // Si es público:
        { path: "reservar", element: <>Aquí va el Stepper de Reserva</> },
      ],
    },

    // AUTH
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <>Aquí va el Registro</> },

    // ADMIN (Protegidas + layout admin)
    {
      path: "/admin",
      element: (
        <ProtectedRoute requiredRole="Admin">
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

    // 404 global
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
