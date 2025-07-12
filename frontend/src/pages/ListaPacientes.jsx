// ListaPacientes.jsx
import React, { useState, useEffect } from 'react';
// Não precisamos mais importar ListaPacientes.css se o Tailwind estiver via CDN
// import './ListaPacientes.css'; 

// Mock de dados de pacientes (substitua por dados reais do backend futuramente)
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

function ListaPacientes({ onLogout }) { // Recebe a prop onLogout
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
    console.log(`Simulação: Editar paciente com ID: ${patientId}`);
  };

  const handleDelete = (patientId) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente? Esta ação é irreversível.')) {
      const updatedPatients = patients.filter(patient => patient.id !== patientId);
      setPatients(updatedPatients);
      console.log(`Simulação: Paciente com ID ${patientId} excluído.`);
    }
  };

  const handleAddNewPatient = () => {
    console.log('Simulação: Redirecionar para tela de cadastro de novo paciente');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto w-full bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Lista de Pacientes</h1>
          {/* Botão de Logout */}
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Sair
          </button>
        </div>

        {/* Barra de Busca (RF05) e Botão de Cadastro (RF01) */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou NIS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
          />
          {isAdmin && ( // Botão de cadastro visível apenas para admin (RF08)
            <button
              onClick={handleAddNewPatient}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out w-full sm:w-auto"
            >
              + Cadastrar Novo Paciente
            </button>
          )}
        </div>

        {/* Tabela de Pacientes (RF04) */}
        {filteredPatients.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Nenhum paciente encontrado.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome Completo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Nasc.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade/Estado</th>
                  {isAdmin && ( // Coluna de Ações visível apenas para admin (RF08)
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.nomeCompleto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.cpf}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(patient.dataNascimento).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.cidade}/{patient.estado}
                    </td>
                    {isAdmin && ( // Botões de Ação visíveis apenas para admin (RF08)
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(patient.id)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150 ease-in-out"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-150 ease-in-out"
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
