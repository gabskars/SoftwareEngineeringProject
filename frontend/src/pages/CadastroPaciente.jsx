import React, { useState } from "react";
import "./CadastroPaciente.css";
import { useNavigate } from "react-router-dom";
import axiosService from "../services/axiosService"; // Importando o axiosService

function CadastroPaciente({ onSaveSuccess }) {
  // Estados para cada campo do formulário
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("Independência");
  const [estado, setEstado] = useState("CE");
  const [nis, setNis] = useState("");

  // Estado para mensagens de erro e sucesso
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1);
  };

  // Função para validar CPF
  const validarCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
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

    // Validação dos campos obrigatórios
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

    // Validação de CPF
    if (!validarCpf(cpf)) {
      setErro("CPF inválido. Por favor, verifique o número.");
      return;
    }

    // Formatar os dados do paciente
    const novoPaciente = {
      nome: nomeCompleto,
      cpf,
      dataNascimento: new Date(dataNascimento).toISOString(), // Convertendo a data para o formato esperado pela API
      sexo,
      telefone,
      email,
      endereco,
      bairro,
      cidade,
      estado,
      nis: nis || null, // NIS é opcional
    };

    try {
      // Enviar os dados para a API
      const response = await axiosService.post("/patient", novoPaciente);

      // Sucesso na criação do paciente
      setMensagemSucesso("Paciente cadastrado com sucesso!");

      // Chama a função de sucesso, se passar como props
      if (onSaveSuccess) onSaveSuccess(response.data);

      // Redireciona após sucesso (opcional)
      setTimeout(() => {
        navigate("/pacientes"); // Redireciona para a lista de pacientes após o cadastro
      }, 1500);
    } catch (error) {
      // Tratar erros de requisição
      console.error("Erro ao cadastrar paciente:", error);
      setErro("Erro ao cadastrar paciente. Tente novamente.");
    }
  };

  return (
    <div className="cadastro-paciente-container">
      <div className="cadastro-paciente-card">
        <h1 className="cadastro-paciente-title">Cadastro de Paciente</h1>

        {erro && <p className="cadastro-paciente-erro">{erro}</p>}
        {mensagemSucesso && (
          <p className="cadastro-paciente-sucesso">{mensagemSucesso}</p>
        )}

        <form onSubmit={handleSubmit} className="cadastro-paciente-form">
          {/* Nome Completo */}
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

          {/* CPF */}
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

          {/* Data de Nascimento */}
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

          {/* Sexo */}
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

          {/* Telefone */}
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

          {/* E-mail */}
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

          {/* Endereço */}
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

          {/* Bairro */}
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

          {/* Cidade */}
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

          {/* Estado */}
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

          {/* NIS */}
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
              Salvar Paciente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroPaciente;
