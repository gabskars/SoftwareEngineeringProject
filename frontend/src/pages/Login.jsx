import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErro("");
    setMensagemSucesso("");

    if (email === "admin@email.com" && senha === "1234") {
      setMensagemSucesso("Login bem-sucedido!");
      setTimeout(() => {
        navigate("pacientes");
      }, 1000);
    } else {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {erro && <p className="login-erro">{erro}</p>}
        {mensagemSucesso && <p className="login-sucesso">{mensagemSucesso}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="login-input"
        />

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
