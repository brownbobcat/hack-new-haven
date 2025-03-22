// src/components/RegisterForm.tsx
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/types/company";
import { registerCompany } from "@/services/api";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    companyName: "",
    location: "",
    registrationNumber: "",
    field: "",
    companySize: "",
  });
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
        router.push("/login");
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during registration");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Register Your Company</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="companyName" className="block">
          Company Name
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          required
          value={formData.companyName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="location" className="block">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          required
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="registrationNumber" className="block">
          Registration Number
        </label>
        <input
          id="registrationNumber"
          name="registrationNumber"
          type="text"
          required
          value={formData.registrationNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="field" className="block">
          Field/Area
        </label>
        <input
          id="field"
          name="field"
          type="text"
          required
          value={formData.field}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="companySize" className="block">
          Company Size
        </label>
        <select
          id="companySize"
          name="companySize"
          required
          value={formData.companySize}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select company size</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501+">501+ employees</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}
