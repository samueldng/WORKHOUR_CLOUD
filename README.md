# Workhour Cloud

Uma plataforma SaaS unificada para equipes home office e freelancers, combinando ambiente de trabalho em nuvem, controle de horas, produtividade e pagamento automatizado.

## Estrutura do Projeto

```
workhour-cloud/
├── frontend/          # Aplicação React (Vite)
├── backend/           # API Node.js (NestJS)
├── OS.js/             # Ambiente de trabalho em nuvem OS.js com tema macOS
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

### Ambiente de Trabalho em Nuvem (OS.js)
- OS.js v3 - Plataforma de desktop web
- Tema personalizado macOS
- Contador de horas trabalhadas integrado
- Correção de ícones do sistema de arquivos

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

# Em outra aba do terminal, instalar dependências do OS.js
cd ../OS.js
npm install

# Construir e iniciar o servidor OS.js
cd ../OS.js
npm run build
npm run serve
```

## Build para Produção

```bash
# Build do backend
cd backend
npm run build

# Build do frontend
cd ../frontend
npm run build

# Build do OS.js
cd ../OS.js
npm run build
```

## Docker

```bash
# Iniciar todos os serviços com Docker Compose
cd docker
docker-compose up
```

## Funcionalidades do OS.js

O ambiente de trabalho em nuvem OS.js inclui:

1. **Tema macOS Personalizado** - Interface semelhante ao macOS com botões de tráfego e design refinado
2. **Contador de Horas Trabalhadas** - Rastreador de tempo com cálculo de ganhos monetários em tempo real
3. **Correção de Ícones** - Correção de problemas de carregamento de ícones no sistema de arquivos
4. **Integração Completa** - Integração perfeita com o ecossistema Workhour Cloud

Para mais detalhes sobre as funcionalidades do OS.js, consulte [docs/guides/osjs-features.md](docs/guides/osjs-features.md).