// App.jsx
import React, { useState } from 'react';
import Login from "./pages/Login";
import ListaPacientes from "./pages/ListaPacientes";
import CadastroPaciente from "./pages/CadastroPaciente";
import EditarPaciente from "./pages/EditarPaciente"; // Importa o novo componente
import './App.css'; // Mantenha o CSS global da aplicação

function App() {
  // Estado para controlar a tela atual: 'login', 'listaPacientes', 'cadastroPaciente', 'editarPaciente'
  const [currentScreen, setCurrentScreen] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [patientIdToEdit, setPatientIdToEdit] = useState(null); // Novo estado para o ID do paciente a ser editado

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

  // Função para navegar para a tela de edição
  const handleNavigateToEdit = (id) => {
    setPatientIdToEdit(id); // Define o ID do paciente a ser editado
    setCurrentScreen('editarPaciente');
  };

  // Função para lidar com o sucesso do cadastro/edição e voltar para a lista
  const handleFormSaveSuccess = (updatedPatient = null) => { // Pode receber paciente atualizado
    console.log('Formulário salvo com sucesso! Voltando para a lista.');
    // Se for uma edição, você pode querer atualizar o mockPatients em ListaPacientes
    // ou apenas forçar uma recarga da lista em uma app real.
    setCurrentScreen('listaPacientes');
    setPatientIdToEdit(null); // Limpa o ID após voltar
  };

  // Função para cancelar o cadastro/edição e voltar para a lista
  const handleFormCancel = () => {
    setCurrentScreen('listaPacientes');
    setPatientIdToEdit(null); // Limpa o ID após cancelar
  };

  return (
    <>
      {currentScreen === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}

      {currentScreen === 'listaPacientes' && (
        <ListaPacientes
          onLogout={handleLogout}
          onAddNewPatient={handleNavigateToCadastro}
          onEditPatient={handleNavigateToEdit} // Passa a função para navegar para edição
        />
      )}

      {currentScreen === 'cadastroPaciente' && (
        <CadastroPaciente
          onSaveSuccess={handleFormSaveSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {currentScreen === 'editarPaciente' && patientIdToEdit && (
        <EditarPaciente
          patientId={patientIdToEdit} // Passa o ID do paciente para o componente de edição
          onSaveSuccess={handleFormSaveSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </>
  );
}

export default App;
