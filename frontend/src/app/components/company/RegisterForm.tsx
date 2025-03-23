// src/components/company/RegisterForm.tsx
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/types/company";
import { registerCompany } from "@/services/api";

export default function CompanyRegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    companyName: "",
    companyAddress: "",
    companyCity: "",
    companyStateOrProvince: "",
    companyEmail: "",
    password: "",
    companyPhone: "",
    companyCode: "",
    natureOfBusiness: "",
    companySize: "",
  });
  console.log("formData", formData);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await registerCompany(formData);

      if (result.success) {
        router.push("/company/login");
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during registration");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label
          htmlFor="companyEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="companyEmail"
          name="companyEmail"
          type="email"
          required
          value={formData.companyEmail}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          required
          value={formData.companyName}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="companyAddress"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          id="companyAddress"
          name="companyAddress"
          type="text"
          required
          value={formData.companyAddress}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="companyCity"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <input
          id="companyCity"
          name="companyCity"
          type="text"
          required
          value={formData.companyCity}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="companyStateOrProvince"
          className="block text-sm font-medium text-gray-700"
        >
          State/Province
        </label>
        <input
          id="companyStateOrProvince"
          name="companyStateOrProvince"
          type="text"
          required
          value={formData.companyStateOrProvince}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="companyPhone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <input
          id="companyPhone"
          name="companyPhone"
          type="tel"
          required
          value={formData.companyPhone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="companyCode"
          className="block text-sm font-medium text-gray-700"
        >
          Company Code
        </label>
        <input
          id="companyCode"
          name="companyCode"
          type="text"
          required
          value={formData.companyCode}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="natureOfBusiness"
          className="block text-sm font-medium text-gray-700"
        >
          Nature of Business
        </label>
        <input
          id="natureOfBusiness"
          name="natureOfBusiness"
          type="text"
          required
          value={formData.natureOfBusiness}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="companySize"
          className="block text-sm font-medium text-gray-700"
        >
          Company Size
        </label>
        <select
          id="companySize"
          name="companySize"
          required
          value={formData.companySize}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select company size</option>
          <option value="Small">Small (0-50 employees)</option>
          <option value="Medium">Medium (51-200 employees)</option>
          <option value="Large">Large (201+ employees)</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Register
      </button>
    </form>
  );
}
