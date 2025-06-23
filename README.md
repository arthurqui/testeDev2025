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

## Exercícios para o Teste de Desenvolvimento

### Exercício 1: Correção de Bug na Listagem de Cadastros
Um bug foi inserido propositalmente na integração da listagem de cadastros após o login no frontend. Ao tentar acessar a dashboard, um erro visível será exibido na tela. Corrija esse erro para que a lista de usuários cadastrados seja exibida corretamente. O problema está na página de dashboard do frontend, responsável por buscar e exibir os usuários.

### Exercício 2: Criar Endpoint de Delete de Usuário
Atualmente, a API possui apenas três endpoints: cadastro (`POST /api/Auth/register`), login (`POST /api/Auth/login`) e listagem de usuários (`GET /api/Usuarios`). Implemente um novo endpoint para deletar um usuário cadastrado no banco de dados. O novo endpoint deve ser criado no mesmo controller onde estão os outros endpoints relacionados a usuários.

### Exercício 3: Estilizar a Tela de Login
Altere a tela de login do frontend para exibir o nome da aplicação "Registros Devs" centralizado no topo. Abaixo, centralize os campos de email, senha e os botões de logar e cadastrar, deixando a tela visualmente mais agradável, mesmo que de forma simples.

### Exercício 4: (Reservado)

### Exercício 5: Botão Delete Dinâmico na Dashboard
Adicione um botão "Delete" em cada linha da lista de usuários na dashboard. Esse botão deve chamar o endpoint de delete criado no exercício 2 e remover o registro correspondente da lista exibida na tela.

---

Boa sorte! Qualquer dúvida, pesquise, consulte a documentação ou peça ajuda. 