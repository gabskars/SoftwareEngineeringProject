// App.jsx
import React, { useState } from 'react';
import Login from "./pages/Login";
import ListaPacientes from "./pages/ListaPacientes";
import CadastroPaciente from "./pages/CadastroPaciente";
import './App.css'; // Importa o CSS global da aplicação

function App() {
  // Estado para controlar a tela atual: 'login', 'listaPacientes', 'cadastroPaciente'
  const [currentScreen, setCurrentScreen] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState(null); // Para armazenar informações do usuário logado

  // Função para lidar com o sucesso do login
  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    setCurrentScreen('listaPacientes');
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentScreen('login');
  };

  // Função para navegar para a tela de cadastro
  const handleNavigateToCadastro = () => {
    setCurrentScreen('cadastroPaciente');
  };

  // Função para lidar com o sucesso do cadastro e voltar para a lista
  // A função onSaveSuccess no CadastroPaciente.jsx não precisa passar o newPatient para o App.jsx
  // se o App.jsx apenas muda a tela de volta para a lista.
  const handleCadastroSuccess = () => {
    console.log('Paciente cadastrado com sucesso! Voltando para a lista.');
    setCurrentScreen('listaPacientes');
  };

  // Função para cancelar o cadastro e voltar para a lista
  const handleCadastroCancel = () => {
    setCurrentScreen('listaPacientes');
  };

  return (
    <>
      {currentScreen === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentScreen === 'listaPacientes' && (
        <ListaPacientes
          onLogout={handleLogout}
          onAddNewPatient={handleNavigateToCadastro} // Passa a função para navegar para cadastro
        />
      )}
      {currentScreen === 'cadastroPaciente' && (
        <CadastroPaciente
          onSaveSuccess={handleCadastroSuccess}
          onCancel={handleCadastroCancel}
        />
      )}
    </>
  );
}

export default App;
