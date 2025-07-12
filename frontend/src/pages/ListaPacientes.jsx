// ListaPacientes.jsx
import React, { useState, useEffect } from 'react';
import './ListaPacientes.css'; // Importa o CSS tradicional para esta página

// Mock de dados de pacientes (MESMO MOCK USADO EM EditarPaciente.jsx)
const mockPatients = [
  {
    id: '1',
    nomeCompleto: 'João Silva',
    cpf: '123.456.789-01',
    dataNascimento: '1980-01-15',
    sexo: 'Masculino',
    telefone: '(88) 98765-4321',
    email: 'joao.silva@example.com',
    endereco: 'Rua A, 123',
    bairro: 'Centro',
    cidade: 'Independência',
    estado: 'CE',
    nis: '12345678901',
    criadoEm: '2023-01-01T10:00:00Z',
    atualizadoEm: '2023-01-01T10:00:00Z',
  },
  {
    id: '2',
    nomeCompleto: 'Maria Oliveira',
    cpf: '987.654.321-09',
    dataNascimento: '1992-05-20',
    sexo: 'Feminino',
    telefone: '(88) 91234-5678',
    email: 'maria.o@example.com',
    endereco: 'Avenida B, 456',
    bairro: 'Vila Nova',
    cidade: 'Independência',
    estado: 'CE',
    nis: '98765432109',
    criadoEm: '2023-02-10T11:30:00Z',
    atualizadoEm: '2023-02-10T11:30:00Z',
  },
  {
    id: '3',
    nomeCompleto: 'Pedro Souza',
    cpf: '111.222.333-44',
    dataNascimento: '1975-11-03',
    sexo: 'Masculino',
    telefone: null,
    email: 'pedro.souza@example.com',
    endereco: 'Travessa C, 789',
    bairro: 'Jardim',
    cidade: 'Fortaleza',
    estado: 'CE',
    nis: null,
    criadoEm: '2023-03-15T09:15:00Z',
    atualizadoEm: '2023-03-15T09:15:00Z',
  },
  {
    id: '4',
    nomeCompleto: 'Ana Costa',
    cpf: '555.444.333-22',
    dataNascimento: '1995-08-22',
    sexo: 'Feminino',
    telefone: '(85) 99876-1234',
    email: 'ana.costa@example.com',
    endereco: 'Rua D, 789',
    bairro: 'Aldeota',
    cidade: 'Fortaleza',
    estado: 'CE',
    nis: '55544433322',
    criadoEm: '2023-04-01T14:00:00Z',
    atualizadoEm: '2023-04-01T14:00:00Z',
  },
];

function ListaPacientes({ onLogout, onAddNewPatient, onEditPatient }) { // Adicionada a prop onEditPatient
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);
  const [isAdmin, setIsAdmin] = useState(true); // Simulação de permissão de administrador

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = patients.filter(patient =>
      patient.nomeCompleto.toLowerCase().includes(lowerCaseSearchTerm) ||
      patient.cpf.includes(lowerCaseSearchTerm) ||
      (patient.nis && patient.nis.includes(lowerCaseSearchTerm))
    );
    setFilteredPatients(results);
  }, [searchTerm, patients]);

  const handleEdit = (patientId) => {
    console.log(`Simulação: Navegar para edição do paciente com ID: ${patientId}`);
    if (onEditPatient) {
      onEditPatient(patientId); // Chama a função para navegar para a tela de edição
    }
  };

  const handleDelete = (patientId) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente? Esta ação é irreversível.')) {
      const updatedPatients = patients.filter(patient => patient.id !== patientId);
      setPatients(updatedPatients);
      console.log(`Simulação: Paciente com ID ${patientId} excluído.`);
    }
  };

  return (
    <div className="lista-pacientes-container">
      <div className="lista-pacientes-card">
        <div className="lista-pacientes-header">
          <h1 className="lista-pacientes-title">Lista de Pacientes</h1>
          <button
            onClick={onLogout}
            className="btn-sair"
          >
            Sair
          </button>
        </div>

        <div className="lista-pacientes-search-add">
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou NIS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {isAdmin && (
            <button
              onClick={onAddNewPatient}
              className="btn-add-paciente"
            >
              + Cadastrar Novo Paciente
            </button>
          )}
        </div>

        {filteredPatients.length === 0 ? (
          <p className="no-patients-message">Nenhum paciente encontrado.</p>
        ) : (
          <div className="tabela-pacientes-wrapper">
            <table className="tabela-pacientes">
              <thead>
                <tr>
                  <th>Nome Completo</th>
                  <th>CPF</th>
                  <th>Data Nasc.</th>
                  <th>Cidade/Estado</th>
                  {isAdmin && (
                    <th className="acoes-header">Ações</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.nomeCompleto}</td>
                    <td>{patient.cpf}</td>
                    <td>{new Date(patient.dataNascimento).toLocaleDateString('pt-BR')}</td>
                    <td>{patient.cidade}/{patient.estado}</td>
                    {isAdmin && (
                      <td className="acoes-cell">
                        <button
                          onClick={() => handleEdit(patient.id)}
                          className="btn-editar"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="btn-excluir"
                        >
                          Excluir
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaPacientes;
