// App.jsx
import React from 'react';
import Login from "./pages/Login"; // Certifique-se de que o caminho para Login.jsx está correto
import './App.css'; // Importa o CSS global da aplicação

function App() {
  return (
    // O componente Login será renderizado diretamente.
    // Os estilos de tela cheia e fundo serão gerenciados por App.css e Login.css.
    <Login />
  );
}

export default App;
