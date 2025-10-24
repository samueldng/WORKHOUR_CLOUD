# Workhour Cloud - Step-by-Step Implementation Guide

## Immediate Priority Tasks

This document provides detailed step-by-step instructions for implementing the most critical pending features in the Workhour Cloud platform.

## 1. Fix OS.js Theme and Window Controls

### Task 1.1: Restore macOS Theme Files
**Status**: IN PROGRESS

**Steps**:
1. Create the missing theme files in the macOS theme dist directory:

```bash
# Navigate to the OS.js directory
cd OS.js

# Create the dist directory if it doesn't exist
mkdir -p src/packages/macOS-theme/dist

# Copy the theme files from custom-components to the theme dist directory
cp src/custom-components/main.css src/packages/macOS-theme/dist/main.css
```

2. Create the main.js file for the theme:

```javascript
// File: OS.js/src/packages/macOS-theme/dist/main.js
/*
 * macOS Theme for OS.js
 */

module.exports = {
  type: 'theme',
  name: 'MacOSTheme',
  title: {
    en_EN: 'macOS Theme',
    fr_FR: 'Thème macOS',
    de_DE: 'macOS-Thema',
    sl_SI: 'macOS Tema',
    pt_BR: 'Tema macOS'
  },
  description: {
    en_EN: 'macOS Theme',
    fr_FR: 'Thème macOS',
    de_DE: 'macOS-Thema',
    sl_SI: 'macOS Tema',
    pt_BR: 'Tema macOS'
  },
  files: [
    'main.css'
  ]
};
```

3. Run package discovery to register the theme:

```bash
# From the OS.js directory
npx osjs-cli package:discover
```

### Task 1.2: Fix Window Control Buttons
**Status**: PENDING

**Steps**:
1. Update the macOS theme CSS to properly style window control buttons:

```css
/* Add to OS.js/src/packages/macOS-theme/dist/main.css */

/* Window control buttons - macOS style */
.osjs-window-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 4px;
  position: relative;
}

.osjs-window-button:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.osjs-window-button:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  z-index: 1;
}

/* Close button */
.osjs-window-button[data-action="close"]:before {
  background: #ff5f57;
  border: 1px solid #e2463f;
}

.osjs-window-button[data-action="close"]:after {
  background: #ff5f57;
  border: 1px solid #e2463f;
}

/* Minimize button */
.osjs-window-button[data-action="minimize"]:before {
  background: #ffbd2e;
  border: 1px solid #dfa125;
}

.osjs-window-button[data-action="minimize"]:after {
  background: #ffbd2e;
  border: 1px solid #dfa125;
}

/* Maximize button */
.osjs-window-button[data-action="maximize"]:before {
  background: #28c940;
  border: 1px solid #1fad34;
}

.osjs-window-button[data-action="maximize"]:after {
  background: #28c940;
  border: 1px solid #1fad34;
}

/* Hover effects */
.osjs-window-button:hover:before {
  filter: brightness(1.1);
}

.osjs-window-button:hover:after {
  filter: brightness(1.1);
}
```

2. Rebuild the OS.js application:

```bash
npm run build
```

### Task 1.3: Remove File Manager Search Functionality
**Status**: PENDING

**Steps**:
1. Add CSS to hide the search functionality in the file manager:

```css
/* Add to OS.js/src/packages/macOS-theme/dist/main.css */

/* File manager styles - remove search functionality */
.osjs-filemanager-minimalistic .osjs-gui-panes-inner>div:first-child,
.osjs-filemanager-minimalistic .osjs-gui-panes-inner>div:nth-child(2) {
  display: none;
}
```

2. Rebuild the OS.js application:

```bash
npm run build
```

## 2. Database Integration

### Task 2.1: Set up PostgreSQL with Prisma
**Status**: PENDING

**Steps**:
1. Install Prisma in the backend:

```bash
# Navigate to backend directory
cd backend

# Install Prisma
npm install prisma @prisma/client
```

2. Initialize Prisma:

```bash
npx prisma init
```

3. Configure the database connection in `.env`:

```
DATABASE_URL="postgresql://username:password@localhost:5432/workhour_cloud?schema=public"
```

4. Define the database schema in `prisma/schema.prisma`:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  projects  Project[]
  timeEntries TimeEntry[]
}

model Project {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  status      String   @default("active")
  startDate   DateTime
  endDate     DateTime?
  hourlyRate  Float    @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  tasks       Task[]
  timeEntries TimeEntry[]
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  status      String   @default("todo")
  projectId   Int
  project     Project  @relation(fields: [projectId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  timeEntries TimeEntry[]
}

model TimeEntry {
  id        Int      @id @default(autoincrement())
  startTime DateTime
  endTime   DateTime?
  duration  Int      @default(0) // in seconds
  status    String   @default("active")
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  projectId Int?
  project   Project? @relation(fields: [projectId], references: [id])
  taskId    Int?
  task      Task?    @relation(fields: [taskId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

5. Generate Prisma client:

```bash
npx prisma generate
```

6. Create the initial migration:

```bash
npx prisma migrate dev --name init
```

### Task 2.2: Update Backend Services to Use Database
**Status**: PENDING

**Steps**:
1. Update the time tracker service to use Prisma:

```typescript
// backend/src/time-tracker/time-tracker.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimeTrackerService {
  constructor(private prisma: PrismaService) {}

  async startTracking(userId: number, startTimeDto: any) {
    const entry = await this.prisma.timeEntry.create({
      data: {
        userId,
        projectId: startTimeDto.projectId,
        taskId: startTimeDto.taskId,
        startTime: new Date(),
        status: 'active'
      }
    });
    return entry;
  }

  async stopTracking(userId: number, entryId: number) {
    const entry = await this.prisma.timeEntry.findFirst({
      where: {
        id: entryId,
        userId: userId,
        status: 'active'
      }
    });

    if (entry) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - entry.startTime.getTime()) / 1000);
      
      const updatedEntry = await this.prisma.timeEntry.update({
        where: { id: entryId },
        data: {
          endTime: endTime,
          duration: duration,
          status: 'completed'
        }
      });
      
      return updatedEntry;
    }
    return null;
  }

  async getTimeEntries(userId: number) {
    return this.prisma.timeEntry.findMany({
      where: { userId: userId },
      orderBy: { startTime: 'desc' }
    });
  }

  async getTimeEntry(userId: number, id: number) {
    return this.prisma.timeEntry.findFirst({
      where: { id: id, userId: userId }
    });
  }

  async updateEntry(userId: number, id: number, updateDto: any) {
    return this.prisma.timeEntry.update({
      where: { id: id, userId: userId },
      data: updateDto
    });
  }

  async getSummary(userId: number) {
    const entries = await this.prisma.timeEntry.findMany({
      where: { userId: userId }
    });
    
    const totalEntries = entries.length;
    const totalDuration = entries.reduce((sum, entry) => sum + entry.duration, 0);
    const activeEntries = entries.filter(e => e.status === 'active').length;
    
    return {
      totalEntries,
      totalDuration, // in seconds
      activeEntries,
      totalHours: totalDuration / 3600 // convert to hours
    };
  }
}
```

2. Create the Prisma service:

```typescript
// backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

3. Update the time tracker module:

```typescript
// backend/src/time-tracker/time-tracker.module.ts
import { Module } from '@nestjs/common';
import { TimeTrackerService } from './time-tracker.service';
import { TimeTrackerController } from './time-tracker.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TimeTrackerController],
  providers: [TimeTrackerService, PrismaService],
  exports: [TimeTrackerService]
})
export class TimeTrackerModule {}
```

## 3. Frontend Authentication Integration

### Task 3.1: Complete Authentication Flow
**Status**: PENDING

**Steps**:
1. Update the API service to handle authentication:

```typescript
// frontend/src/services/api.ts (update the AuthResponse interface)
interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

// Add authentication methods to the ApiService class
class ApiService {

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile(): Promise<any> {
    return this.request('/auth/profile', {
      method: 'GET',
    });
  }
}
```

2. Create authentication context for React:

```typescript
// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
      api.getProfile().then(profile => {
        setUser(profile.user);
        setIsAuthenticated(true);
      }).catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    const response = await api.login({ username, password });
    api.setToken(response.access_token);
    localStorage.setItem('token', response.access_token);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await api.register({ username, email, password });
    api.setToken(response.access_token);
    localStorage.setItem('token', response.access_token);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    api.logout();
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

3. Update the main application to use authentication:

```typescript
// frontend/src/App.tsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import { useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Dashboard /> : <LoginForm />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
```

## 4. Docker Configuration

### Task 4.1: Set up PostgreSQL Container
**Status**: PENDING

**Steps**:
1. Update the docker-compose.yml file:

```yaml
# docker/docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ../frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build:
      context: ../backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://workhour:password@postgres:5432/workhour_cloud?schema=public
    depends_on:
      - postgres

  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: workhour
      POSTGRES_PASSWORD: password
      POSTGRES_DB: workhour_cloud
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  osjs:
    build:
      context: ../OS.js
      dockerfile: Dockerfile
    ports:
      - "8000:8000"

volumes:
  postgres_data:
```

## Next Steps

After completing these immediate tasks, proceed with:

1. Implement comprehensive testing
2. Add security features
3. Create CI/CD pipeline
4. Deploy to production environment
5. Monitor and optimize performance

## Verification Checklist

Before moving to the next phase, ensure all these tasks are completed:

- [ ] macOS theme files restored and registered
- [ ] Window control buttons displaying correctly
- [ ] File manager search functionality removed
- [ ] PostgreSQL database set up with Prisma
- [ ] Backend services updated to use database
- [ ] Frontend authentication flow completed
- [ ] Docker containers configured properly
- [ ] All services running without errors