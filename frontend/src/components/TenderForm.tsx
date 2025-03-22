// src/components/tender/TenderForm.tsx
"use client";

import { useState } from "react";
import { TenderRequirements } from "@/types/proposal";

interface TenderFormProps {
  onSubmit: (requirements: TenderRequirements) => void;
}

export default function TenderForm({ onSubmit }: TenderFormProps) {
  const [requirements, setRequirements] = useState<TenderRequirements>({
    title: "",
    description: "",
    budgetRange: { min: 0, max: 0 },
    timelineRange: { min: 0, max: 0 },
    technicalRequirements: [""],
    keyDeliverables: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRequirements((prev) => ({ ...prev, [name]: value }));
  };

  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rangeType: "budgetRange" | "timelineRange",
    field: "min" | "max"
  ) => {
    const value = parseInt(e.target.value);
    setRequirements((prev) => ({
      ...prev,
      [rangeType]: { ...prev[rangeType], [field]: value },
    }));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: "technicalRequirements" | "keyDeliverables"
  ) => {
    const newArray = [...requirements[field]];
    newArray[index] = value;
    setRequirements((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: "technicalRequirements" | "keyDeliverables") => {
    setRequirements((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    index: number,
    field: "technicalRequirements" | "keyDeliverables"
  ) => {
    const newArray = [...requirements[field]];
    newArray.splice(index, 1);
    setRequirements((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(requirements);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tender Title
        </label>
        <input
          type="text"
          name="title"
          value={requirements.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={requirements.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Budget Range (Min)
          </label>
          <input
            type="number"
            value={requirements.budgetRange.min}
            onChange={(e) => handleRangeChange(e, "budgetRange", "min")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Budget Range (Max)
          </label>
          <input
            type="number"
            value={requirements.budgetRange.max}
            onChange={(e) => handleRangeChange(e, "budgetRange", "max")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Timeline Range (Min days)
          </label>
          <input
            type="number"
            value={requirements.timelineRange.min}
            onChange={(e) => handleRangeChange(e, "timelineRange", "min")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Timeline Range (Max days)
          </label>
          <input
            type="number"
            value={requirements.timelineRange.max}
            onChange={(e) => handleRangeChange(e, "timelineRange", "max")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Technical Requirements
        </label>
        {requirements.technicalRequirements.map((req, index) => (
          <div key={index} className="mt-2 flex">
            <input
              type="text"
              value={req}
              onChange={(e) =>
                handleArrayChange(
                  index,
                  e.target.value,
                  "technicalRequirements"
                )
              }
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, "technicalRequirements")}
              className="ml-2 rounded-md bg-red-100 p-2 text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("technicalRequirements")}
          className="mt-2 rounded-md bg-indigo-100 px-3 py-1 text-indigo-700"
        >
          Add Requirement
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Key Deliverables
        </label>
        {requirements.keyDeliverables.map((deliverable, index) => (
          <div key={index} className="mt-2 flex">
            <input
              type="text"
              value={deliverable}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "keyDeliverables")
              }
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, "keyDeliverables")}
              className="ml-2 rounded-md bg-red-100 p-2 text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("keyDeliverables")}
          className="mt-2 rounded-md bg-indigo-100 px-3 py-1 text-indigo-700"
        >
          Add Deliverable
        </button>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Tender
        </button>
      </div>
    </form>
  );
}
