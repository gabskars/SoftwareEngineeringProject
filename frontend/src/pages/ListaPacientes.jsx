import React, { useState, useEffect } from "react";
import "./ListaPacientes.css";
import axiosService from "../services/axiosService";

function ListaPacientes({ onLogout, onAddNewPatient, onEditPatient }) {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os pacientes ao carregar o componente
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosService.get("/patients");
        setPatients(response.data);
        setFilteredPatients(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar pacientes:", err);
        setError("Erro ao carregar pacientes. Tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filtra os pacientes conforme o termo de busca
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = patients.filter(
      (patient) =>
        patient.nomeCompleto?.toLowerCase().includes(lowerCaseSearchTerm) ||
        patient.cpf?.includes(lowerCaseSearchTerm) ||
        (patient.nis && patient.nis.includes(lowerCaseSearchTerm))
    );
    setFilteredPatients(results);
  }, [searchTerm, patients]);

  const handleEdit = (patientId) => {
    if (onEditPatient) {
      onEditPatient(patientId);
    }
  };

  const handleDelete = async (patientId) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este paciente? Esta ação é irreversível."
      )
    ) {
      try {
        await axiosService.delete(`/patients/${patientId}`);
        const updatedPatients = patients.filter(
          (patient) => patient.id !== patientId
        );
        setPatients(updatedPatients);
      } catch (err) {
        console.error("Erro ao excluir paciente:", err);
        alert("Erro ao excluir paciente. Tente novamente.");
      }
    }
  };

  if (loading) {
    return (
      <div className="lista-pacientes-container">
        <div className="lista-pacientes-card">
          <p>Carregando pacientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lista-pacientes-container">
        <div className="lista-pacientes-card">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-pacientes-container">
      <div className="lista-pacientes-card">
        <div className="lista-pacientes-header">
          <h1 className="lista-pacientes-title">Lista de Pacientes</h1>
          <button onClick={onLogout} className="btn-sair">
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
            <button onClick={onAddNewPatient} className="btn-add-paciente">
              + Cadastrar Novo Paciente
            </button>
          )}
        </div>

        {filteredPatients.length === 0 ? (
          <p className="no-patients-message">
            {searchTerm
              ? "Nenhum paciente encontrado com esse critério."
              : "Nenhum paciente cadastrado."}
          </p>
        ) : (
          <div className="tabela-pacientes-wrapper">
            <table className="tabela-pacientes">
              <thead>
                <tr>
                  <th>Nome Completo</th>
                  <th>CPF</th>
                  <th>Data Nasc.</th>
                  <th>Cidade/Estado</th>
                  {isAdmin && <th className="acoes-header">Ações</th>}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.nomeCompleto}</td>
                    <td>{patient.cpf}</td>
                    <td>
                      {patient.dataNascimento
                        ? new Date(patient.dataNascimento).toLocaleDateString(
                            "pt-BR"
                          )
                        : "-"}
                    </td>
                    <td>
                      {patient.cidade}/{patient.estado}
                    </td>
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
