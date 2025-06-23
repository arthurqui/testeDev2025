import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  // Estado para armazenar a lista de usuários
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  // useEffect roda ao carregar a página
  // Busca o token no localStorage e faz a requisição autenticada para o backend
  // Se não houver token, redireciona para o login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    // Faz a requisição GET para o endpoint de usuários, enviando o token JWT no header
    axios.get('http://localhost:5015/api/Usuarios', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUsuarios(res.data))
      .catch(() => navigate('/'));
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Botão para sair, remove o token e volta para o login */}
      <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Sair</button>
      <ul>
        {/* Lista todos os usuários retornados pelo backend */}
        {usuarios.map(u => (
          <li key={u.id}>{u.username.toUpperCase()} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
} 