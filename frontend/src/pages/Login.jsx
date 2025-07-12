// Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Importa o CSS específico do componente Login

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState(''); // Estado para mensagem de sucesso

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpa mensagens anteriores de erro e sucesso no início da submissão
    setErro('');
    setMensagemSucesso('');

    // Simulação de login (substitua pelo fetch real futuramente)
    if (email === 'admin@email.com' && senha === '1234') {
      setMensagemSucesso('Login bem-sucedido!'); // Exibe mensagem na UI
      // TODO: redirecionar ou mudar estado de autenticação
    } else {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>Login</h2>

        {erro && <p className='login-erro'>{erro}</p>}
        {mensagemSucesso && <p className='login-sucesso'>{mensagemSucesso}</p>} {/* Exibe mensagem de sucesso */}

        <label htmlFor="email">Email:</label> {/* Adicionado 'htmlFor' para acessibilidade */}
        <input
          type="email"
          id="email" // Adicionado 'id' para associar com a label
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='login-input'
        />

        <label htmlFor="senha">Senha:</label> {/* Adicionado 'htmlFor' para acessibilidade */}
        <input
          type="password"
          id="senha" // Adicionado 'id' para associar com a label
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className='login-input'
        />

        <button type="submit" className='login-button'>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
