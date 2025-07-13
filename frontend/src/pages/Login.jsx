// Login.jsx
import React, { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) { // Recebe a prop onLoginSuccess
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setErro('');
    setMensagemSucesso('');

    if (email === 'admin@email.com' && senha === '1234') {
      setMensagemSucesso('Login bem-sucedido!');
      // Chama a função passada pelo App.jsx para indicar sucesso no login
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>Login</h2>

        {erro && <p className='login-erro'>{erro}</p>}
        {mensagemSucesso && <p className='login-sucesso'>{mensagemSucesso}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='login-input'
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
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
