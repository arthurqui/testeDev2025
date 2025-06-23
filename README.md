# testeDev2025

Sistema simples de autenticação e dashboard integrado, desenvolvido para teste de desenvolvedores.

## Tecnologias
- **Backend:** C# (ASP.NET Core) + PostgreSQL
- **Frontend:** React

## Funcionalidades
- Cadastro de usuário
- Login com geração de token JWT
- Dashboard protegida mostrando todos os usuários cadastrados

## Como rodar o projeto

### 1. Backend (C#)

1. Acesse a pasta `Backend`:
   ```sh
   cd Backend
   ```
2. Instale as dependências e rode as migrações (se necessário):
   ```sh
   dotnet restore
   dotnet ef database update
   ```
3. Inicie a API:
   ```sh
   dotnet run
   ```
   A API estará disponível em `http://localhost:5015` (Swagger em `/`).

### 2. Frontend (React)

1. Acesse a pasta `frontend`:
   ```sh
   cd frontend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o frontend:
   ```sh
   npm start
   ```
   O sistema estará disponível em `http://localhost:3000`

## Integração
- O frontend consome os endpoints do backend para cadastro, login e listagem de usuários.
- O token JWT é salvo no `localStorage` após o login e usado para autenticação nas requisições protegidas.

## Endpoints principais
- `POST /api/Auth/register` — Cadastro de usuário
- `POST /api/Auth/login` — Login (retorna token JWT)
- `GET /api/Usuarios` — Lista de usuários (protegido, requer token)

## Observações
- O backend está configurado para aceitar requisições do frontend via CORS.
- O Swagger está disponível na raiz da API para facilitar os testes.

---

Qualquer dúvida, abra uma issue ou entre em contato! 