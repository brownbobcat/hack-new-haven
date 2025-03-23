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
  companyEmail: string;
  password: string;
  companyName: string;
  companyCity: string;
  companyStateOrProvince: string;
  companyAddress: string;
  companyCode: string;
  companyPhone: string;
  natureOfBusiness: string;
  companySize: string;
}
