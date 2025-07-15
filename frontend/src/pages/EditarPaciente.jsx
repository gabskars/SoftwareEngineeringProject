// EditarPaciente.jsx
import React, { useState, useEffect } from "react";
import "./EditarPaciente.css"; // Importa o CSS tradicional para esta página
import axiosService from "../services/axiosService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditarPaciente({ onSaveSuccess }) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [nis, setNis] = useState("");
  const { id: patientId } = useParams();

  // Estado para mensagens de erro e sucesso
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axiosService.get(`/patient/${patientId}`);
        const paciente = response.data;

        setNomeCompleto(paciente.nome || "");
        setCpf(paciente.cpf || "");
        setDataNascimento(
          paciente.dataNascimento
            ? new Date(paciente.dataNascimento).toISOString().split("T")[0]
            : ""
        );
        setSexo(paciente.sexo || "");
        setTelefone(paciente.telefone || "");
        setEmail(paciente.email || "");
        setEndereco(paciente.endereco || "");
        setBairro(paciente.bairro || "");
        setCidade(paciente.cidade || "");
        setEstado(paciente.estado || "");
        setNis(paciente.nis || "");
      } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        setErro("Erro ao carregar dados do paciente.");
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  // Função para validar CPF (básica, apenas formato e dígitos)
  const validarCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0,
      resto;
    for (let i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setMensagemSucesso("");

    if (
      !nomeCompleto ||
      !cpf ||
      !dataNascimento ||
      !sexo ||
      !endereco ||
      !bairro ||
      !cidade ||
      !estado
    ) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!validarCpf(cpf)) {
      setErro("CPF inválido. Por favor, verifique o número.");
      return;
    }

    const pacienteAtualizado = {
      nome: nomeCompleto,
      cpf,
      dataNascimento: new Date(dataNascimento).toISOString(),
      sexo,
      telefone,
      email,
      endereco,
      bairro,
      cidade,
      estado,
      nis: nis || null,
    };

    try {
      await axiosService.put(`/patient/${patientId}`, pacienteAtualizado);
      setMensagemSucesso("Paciente atualizado com sucesso!");
      setTimeout(() => {
        if (onSaveSuccess) onSaveSuccess(pacienteAtualizado);
      }, 1500);
    } catch (error) {
      setErro("Erro ao atualizar paciente. Tente novamente.");
      console.error("Erro de atualização:", error);
    }
  };

  return (
    <div className="editar-paciente-container">
      <div className="editar-paciente-card">
        <h1 className="editar-paciente-title">Editar Paciente</h1>

        {erro && <p className="editar-paciente-erro">{erro}</p>}
        {mensagemSucesso && (
          <p className="editar-paciente-sucesso">{mensagemSucesso}</p>
        )}

        <form onSubmit={handleSubmit} className="editar-paciente-form">
          {/* Nome Completo (Obrigatório) */}
          <div className="form-group">
            <label htmlFor="nomeCompleto">
              Nome Completo <span className="obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="nomeCompleto"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* CPF (Obrigatório e Único) */}
          <div className="form-group">
            <label htmlFor="cpf">
              CPF <span className="obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="form-input"
              placeholder="Ex: 123.456.789-00"
              required
            />
          </div>

          {/* Data de Nascimento (Obrigatório) */}
          <div className="form-group">
            <label htmlFor="dataNascimento">
              Data de Nascimento <span className="obrigatorio">*</span>
            </label>
            <input
              type="date"
              id="dataNascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Sexo (Obrigatório) */}
          <div className="form-group">
            <label htmlFor="sexo">
              Sexo <span className="obrigatorio">*</span>
            </label>
            <select
              id="sexo"
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Selecione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Telefone (Opcional) */}
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="form-input"
              placeholder="Ex: (88) 99999-9999"
            />
          </div>

          {/* E-mail (Opcional) */}
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Ex: nome@example.com"
            />
          </div>

          {/* Endereço (Obrigatório) */}
          <div className="form-group">
            <label htmlFor="endereco">
              Endereço <span className="obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Bairro (Obrigatório) */}
          <div className="form-group">
            <label htmlFor="bairro">
              Bairro <span className="obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Cidade (Padrão: "Independência", mas editável) */}
          <div className="form-group">
            <label htmlFor="cidade">
              Cidade <span className="obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Estado (Padrão: "CE", mas editável) */}
          <div className="form-group">
            <label htmlFor="estado">
              Estado <span className="obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* NIS (Opcional) */}
          <div className="form-group">
            <label htmlFor="nis">NIS</label>
            <input
              type="text"
              id="nis"
              value={nis}
              onChange={(e) => setNis(e.target.value)}
              className="form-input"
              placeholder="Número de Identificação Social"
            />
          </div>

          {/* Botões de Ação */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar Edições
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarPaciente;
