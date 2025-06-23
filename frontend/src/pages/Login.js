import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // Estados para armazenar email, senha e mensagens de erro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Função chamada ao submeter o formulário de login
  // Envia email e senha para o backend, recebe o token e armazena no localStorage
  // Se o login for bem-sucedido, redireciona para a dashboard
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Faz a requisição para o endpoint de login do backend
      const res = await axios.post('http://localhost:5015/api/Auth/login', { Email: email, Senha: senha });
      // Salva o token JWT retornado no localStorage para autenticação das próximas requisições
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      {erro && <p style={{color:'red'}}>{erro}</p>}
      <button onClick={() => navigate('/cadastro')}>Cadastrar</button>
    </div>
  );
} 