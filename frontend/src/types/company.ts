export interface Company {
  id: string;
  email: string;
  companyName: string;
  location: string;
  registrationNumber: string;
  field: string;
  companySize: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  company: Company;
}

export interface RegisterFormData {
  email: string;
  password: string;
  companyName: string;
  location: string;
  registrationNumber: string;
  field: string;
  companySize: string;
}
