# Development Guide

## Prerequisites

- Node.js >= 18.x
- npm >= 8.x
- PostgreSQL >= 14.x
- Docker (optional, for containerization)

## Setup

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Development

### Running the Backend

```bash
cd backend
npm run start:dev
```

The backend will be available at `http://localhost:3000`.

### Running the Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Database Setup

1. Create a PostgreSQL database
2. Update the connection string in `.env` file
3. Run migrations:

```bash
cd backend
npm run prisma:migrate
```

## Testing

### Backend Tests

```bash
cd backend
npm run test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## Building for Production

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```