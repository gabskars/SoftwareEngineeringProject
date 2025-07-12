// App.jsx
import React, { useState } from 'react';
import Login from "./pages/Login";
import ListaPacientes from "./pages/ListaPacientes";
import './App.css'; // Mantenha o CSS global da aplicação

function App() {
  // Estado para controlar se o usuário está logado
  // Inicialize como false para começar na tela de login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função passada para o componente Login para ser chamada no sucesso do login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Função passada para o componente ListaPacientes para fazer logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Renderiza o componente de Login se o usuário não estiver logado */}
      {!isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}

      {/* Renderiza o componente ListaPacientes se o usuário estiver logado */}
      {isLoggedIn && <ListaPacientes onLogout={handleLogout} />}
    </>
  );
}

export default App;
