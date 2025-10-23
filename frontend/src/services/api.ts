const API_BASE_URL = '/api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
  };
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  hourlyRate: number;
}

interface TimeEntry {
  id: number;
  projectId: number;
  taskId: number;
  startTime: string;
  endTime: string | null;
  duration: number;
  status: 'active' | 'completed';
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (this.token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${this.token}`,
      };
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(data: RegisterData): Promise<any> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile(): Promise<any> {
    return this.request('/auth/profile', {
      method: 'GET',
    });
  }

  // Projects endpoints
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects', {
      method: 'GET',
    });
  }

  async getProject(id: number): Promise<Project> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'GET',
    });
  }

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: number, project: Partial<Project>): Promise<Project> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: number): Promise<void> {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Time tracking endpoints
  async getTimeEntries(): Promise<TimeEntry[]> {
    return this.request<TimeEntry[]>('/time/entries', {
      method: 'GET',
    });
  }

  async getTimeEntry(id: number): Promise<TimeEntry> {
    return this.request<TimeEntry>(`/time/entries/${id}`, {
      method: 'GET',
    });
  }

  async startTimeEntry(data: { projectId: number; taskId: number }): Promise<TimeEntry> {
    return this.request<TimeEntry>('/time/start', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async stopTimeEntry(id: number): Promise<TimeEntry> {
    return this.request<TimeEntry>('/time/stop', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  }

  async updateTimeEntry(id: number, data: Partial<TimeEntry>): Promise<TimeEntry> {
    return this.request<TimeEntry>(`/time/entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export default new ApiService();