export interface User {
  id: number;
  name: string;
  email: string;
}

export interface PatientCase {
  id: number;
  user_id: number;
  animal_type: string;
  breed: string | null;
  age: number | null;
  sex: string | null;
  chief_complaint: string | null;
  history: string | null;
  examination: string | null;
  diagnosis: string | null;
  treatment: string | null;
  progress: string | null;
  memo: string | null;
  created_at: string;
  updated_at: string;
}

export interface SeminarNote {
  id: number;
  user_id: number;
  seminar_name: string;
  held_on: string;
  lecturer: string | null;
  theme: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  user?: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}
