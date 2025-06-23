import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  // Estados para armazenar nome, email, senha e mensagens de erro
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Função chamada ao submeter o formulário de cadastro
  // Envia os dados para o backend, que cria o usuário no banco
  // Se o cadastro for bem-sucedido, redireciona para a tela de login
  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      // Faz a requisição para o endpoint de cadastro do backend
      await axios.post('http://localhost:5015/api/Auth/register', { Nome: nome, Email: email, Senha: senha });
      navigate('/');
    } catch {
      setErro('Erro ao cadastrar. Email pode já estar em uso.');
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p style={{color:'red'}}>{erro}</p>}
      <button onClick={() => navigate('/')}>Voltar</button>
    </div>
  );
} 