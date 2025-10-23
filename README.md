# Workhour Cloud

Uma plataforma SaaS unificada para equipes home office e freelancers, combinando ambiente de trabalho em nuvem, controle de horas, produtividade e pagamento automatizado.

## Estrutura do Projeto

```
workhour-cloud/
├── frontend/          # Aplicação React (Vite)
├── backend/           # API Node.js (NestJS)
├── docs/              # Documentação
├── docker/            # Configurações Docker
└── README.md          # Este arquivo
```

## Tecnologias

### Frontend
- React + Vite
- TypeScript
- CSS Modules

### Backend
- Node.js (NestJS)
- TypeScript
- JWT para autenticação
- Bcrypt para hashing de senhas

## Iniciando o Desenvolvimento

```bash
# Instalar dependências do backend
cd backend
npm install

# Iniciar servidor de desenvolvimento do backend
cd ../backend
npm run start:dev

# Em outra aba do terminal, instalar dependências do frontend
cd frontend
npm install

# Iniciar servidor de desenvolvimento do frontend
cd ../frontend
npm run dev
```

## Build para Produção

```bash
# Build do backend
cd backend
npm run build

# Build do frontend
cd ../frontend
npm run build
```

## Docker

```bash
# Iniciar todos os serviços com Docker Compose
cd docker
docker-compose up
```