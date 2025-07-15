import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "./pages/Login";
import ListaPacientes from "./pages/ListaPacientes";
import CadastroPaciente from "./pages/CadastroPaciente";
import EditarPaciente from "./pages/EditarPaciente";
import ErrorPage from "./pages/ErrorPage"; // você pode criar uma página genérica de erro

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "pacientes",
        element: <DashboardLayout />,
        children: [
          {
            index: true, // "/pacientes"
            element: <ListaPacientes />,
          },
          {
            path: "novo", // "/pacientes/novo"
            element: <CadastroPaciente />,
          },
          {
            path: "editar/:id", // "/pacientes/editar/123"
            element: <EditarPaciente />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
