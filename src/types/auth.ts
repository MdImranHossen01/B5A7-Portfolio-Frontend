export interface User {
  id: string;
  email: string;
  username?: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username?: string;
  password: string;
}