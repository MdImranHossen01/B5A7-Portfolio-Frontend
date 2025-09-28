import axios from 'axios';
import { LoginCredentials, RegisterCredentials, User } from '@/types/auth';
import { Blog, BlogFormData, BlogFilters } from '@/types/blog';
import { Project, ProjectFormData } from '@/types/project';
import { Resume, ResumeData } from '@/types/resume';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Define pagination type
interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials) => api.post('/auth/login', credentials),
  register: (credentials: RegisterCredentials) => api.post('/auth/register', credentials),
  getCurrentUser: () => api.get<{ data: User }>('/auth/me'),
};

// Blog API
export const blogApi = {
  getBlogs: (filters?: BlogFilters) => 
    api.get<{ data: Blog[]; count: number; pagination: Pagination }>('/blogs', { params: filters }),
  getBlogBySlug: (slug: string) => api.get<{ data: Blog }>(`/blogs/slug/${slug}`),
  createBlog: (blog: BlogFormData) => api.post<{ data: Blog }>('/blogs', blog),
  updateBlog: (id: string, blog: BlogFormData) => api.put<{ data: Blog }>(`/blogs/${id}`, blog),
  deleteBlog: (id: string) => api.delete(`/blogs/${id}`),
  getAdminBlogs: (filters?: BlogFilters) => 
    api.get<{ data: Blog[]; count: number; pagination: Pagination }>('/blogs/admin/all', { params: filters }),
};

// Project API
export const projectApi = {
  getProjects: (featured?: boolean) => 
    api.get<{ data: Project[] }>('/projects', { params: { featured } }),
  getProjectBySlug: (slug: string) => api.get<{ data: Project }>(`/projects/slug/${slug}`),
  createProject: (project: ProjectFormData) => api.post<{ data: Project }>('/projects', project),
  updateProject: (id: string, project: ProjectFormData) => api.put<{ data: Project }>(`/projects/${id}`, project),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),
  getAdminProjects: (filters?: BlogFilters) => 
    api.get<{ data: Project[]; count: number; pagination: Pagination }>('/projects/admin/all', { params: filters }),
};

// Resume API
export const resumeApi = {
  getUserResumes: () => api.get<{ data: Resume[] }>('/resumes'),
  getResumeById: (id: string) => api.get<{ data: Resume }>(`/resumes/${id}`),
  createResume: (title: string, data: ResumeData) => 
    api.post<{ data: Resume }>('/resumes', { title, data }),
  updateResume: (id: string, title: string, data: ResumeData) => 
    api.put<{ data: Resume }>(`/resumes/${id}`, { title, data }),
  deleteResume: (id: string) => api.delete(`/resumes/${id}`),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
};

export default api;