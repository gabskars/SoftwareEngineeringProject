// EditarPaciente.jsx
import React, { useState, useEffect } from 'react';
import './EditarPaciente.css'; // Importa o CSS tradicional para esta página

// Mock de dados de pacientes (MESMO MOCK USADO EM ListaPacientes.jsx)
// Em uma aplicação real, você buscaria esses dados do backend
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

function EditarPaciente({ patientId, onSaveSuccess, onCancel }) {
  // Estados para cada campo do formulário, inicializados vazios
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [nis, setNis] = useState('');

  // Estado para mensagens de erro e sucesso
  const [erro, setErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // useEffect para carregar os dados do paciente quando o componente é montado
  // ou quando patientId muda
  useEffect(() => {
    if (patientId) {
      // Em uma aplicação real, você faria um fetch para o backend aqui:
      // fetch(`/api/pacientes/${patientId}`)
      //   .then(response => response.json())
      //   .then(data => { /* preencher estados */ })
      //   .catch(error => { /* lidar com erro, talvez redirecionar */ });

      // Simulação: Encontra o paciente no mock de dados
      const patientToEdit = mockPatients.find(p => p.id === patientId);

      if (patientToEdit) {
        setNomeCompleto(patientToEdit.nomeCompleto || '');
        setCpf(patientToEdit.cpf || '');
        // Formata a data para 'YYYY-MM-DD' para o input type="date"
        setDataNascimento(patientToEdit.dataNascimento ? patientToEdit.dataNascimento.split('T')[0] : '');
        setSexo(patientToEdit.sexo || '');
        setTelefone(patientToEdit.telefone || '');
        setEmail(patientToEdit.email || '');
        setEndereco(patientToEdit.endereco || '');
        setBairro(patientToEdit.bairro || '');
        setCidade(patientToEdit.cidade || '');
        setEstado(patientToEdit.estado || '');
        setNis(patientToEdit.nis || '');
      } else {
        setErro('Paciente não encontrado para edição.');
        // Opcional: redirecionar de volta para a lista se o paciente não for encontrado
        // setTimeout(() => onCancel(), 2000);
      }
    }
  }, [patientId, onCancel]); // Dependência de onCancel para evitar warnings, embora não mude

  // Função para validar CPF (básica, apenas formato e dígitos)
  const validarCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    setMensagemSucesso('');

    // Validação dos campos obrigatórios
    if (!nomeCompleto || !cpf || !dataNascimento || !sexo || !endereco || !bairro || !cidade || !estado) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validação de CPF
    if (!validarCpf(cpf)) {
      setErro('CPF inválido. Por favor, verifique o número.');
      return;
    }

    // Simulação de atualização de dados (RF02)
    const pacienteAtualizado = {
      id: patientId,
      nomeCompleto,
      cpf,
      dataNascimento,
      sexo,
      telefone,
      email,
      endereco,
      bairro,
      cidade,
      estado,
      nis: nis || null,
      criadoEm: mockPatients.find(p => p.id === patientId)?.criadoEm || new Date().toISOString(), // Mantém data de criação original
      atualizadoEm: new Date().toISOString(), // Atualiza a data de atualização (RF09)
    };

    console.log('Paciente a ser atualizado:', pacienteAtualizado);
    setMensagemSucesso('Paciente atualizado com sucesso!');

    // Em uma aplicação real, você faria uma chamada PUT/PATCH para o backend:
    // fetch(`/api/pacientes/${patientId}`, {
    //   method: 'PUT', // ou 'PATCH'
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(pacienteAtualizado)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setMensagemSucesso('Paciente atualizado com sucesso!');
    //   if (onSaveSuccess) onSaveSuccess(data); // Passa o paciente atualizado de volta
    // })
    // .catch(error => {
    //   setErro('Erro ao atualizar paciente. Tente novamente.');
    //   console.error('Erro de atualização:', error);
    // });

    // Após simulação de sucesso, pode chamar a função para voltar à lista
    setTimeout(() => {
      if (onSaveSuccess) onSaveSuccess(pacienteAtualizado); // Passa o paciente atualizado para o App.jsx
    }, 1500);
  };

  return (
    <div className="editar-paciente-container">
      <div className="editar-paciente-card">
        <h1 className="editar-paciente-title">Editar Paciente</h1>

        {erro && <p className="editar-paciente-erro">{erro}</p>}
        {mensagemSucesso && <p className="editar-paciente-sucesso">{mensagemSucesso}</p>}

        <form onSubmit={handleSubmit} className="editar-paciente-form">
          {/* Nome Completo (Obrigatório) */}
          <div className="form-group">
            <label htmlFor="nomeCompleto">Nome Completo <span className="obrigatorio">*</span></label>
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
            <label htmlFor="cpf">CPF <span className="obrigatorio">*</span></label>
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
            <label htmlFor="dataNascimento">Data de Nascimento <span className="obrigatorio">*</span></label>
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
            <label htmlFor="sexo">Sexo <span className="obrigatorio">*</span></label>
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
            <label htmlFor="endereco">Endereço <span className="obrigatorio">*</span></label>
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
            <label htmlFor="bairro">Bairro <span className="obrigatorio">*</span></label>
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
            <label htmlFor="cidade">Cidade <span className="obrigatorio">*</span></label>
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
            <label htmlFor="estado">Estado <span className="obrigatorio">*</span></label>
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
            <button
              type="submit"
              className="btn btn-primary"
            >
              Salvar Edições
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarPaciente;