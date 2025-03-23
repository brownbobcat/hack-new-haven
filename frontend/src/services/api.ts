/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterFormData, Company } from "@/types/company";
import axios from "axios";

export interface LoginCredentials {
  companyCode: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  companyData?: any;
}

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = "http://localhost:8080/api/v1";
// process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export const registerCompany = async (
  data: RegisterFormData
): Promise<{ success: boolean; message: string }> => {
  console.log("Data to send:", data);

  try {
    const response = await axios.post(`${API_URL}/company/register`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("Response:", response.data);

    return {
      success: true,
      message: response.data.message || "Registration successful",
    };
  } catch (error) {
    console.error("Registration error:", error);

    if (axios.isAxiosError(error)) {
      // Handle Axios specific errors
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Error ${error.response?.status || ""}: Registration failed`;

      return { success: false, message: errorMessage };
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "An unknown error occurred" };
  }
};

export const getCompanyProfile = async (token: string): Promise<Company> => {
  try {
    const response = await fetch("http://localhost:8080/api/company/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch company profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching company profile:", error);
    throw error;
  }
};

// Add or update this function in your src/services/api.ts file
export const loginCompany = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    // Use the Next.js API route as a proxy
    const response = await axios.post(
      "/api/company/login", // Use correct URL format (no leading dot)
      {
        companyCode: credentials.companyCode,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Login response:", response.data);

    return {
      success: true,
      companyData: response.data || { companyCode: credentials.companyCode },
    };
  } catch (error) {
    console.error("Login error:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Error ${error.response?.status || ""}: Login failed`;

      return { success: false, message: errorMessage };
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "An unknown error occurred" };
  }
};
