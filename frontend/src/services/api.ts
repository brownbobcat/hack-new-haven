import { RegisterFormData, Company } from "@/types/company";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerCompany = async (
  data: RegisterFormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return { success: true, message: "Registration successful" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
};

export const getCompanyProfile = async (token: string): Promise<Company> => {
  try {
    const response = await fetch(`${API_URL}/api/company/profile`, {
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
