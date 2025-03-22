// src/components/proposal/ProposalForm.tsx
"use client";

import { useState } from "react";
import { Proposal } from "@/types/proposal";
import { v4 as uuidv4 } from "uuid";

interface ProposalFormProps {
  onSubmit: (proposal: Proposal) => void;
}

export default function ProposalForm({ onSubmit }: ProposalFormProps) {
  const [proposal, setProposal] = useState<Omit<Proposal, "id">>({
    companyName: "",
    title: "",
    content: "",
    budget: 0,
    timeline: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "budget" || name === "timeline" ? parseFloat(value) : value;

    setProposal((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: uuidv4(), ...proposal });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          value={proposal.companyName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Proposal Title
        </label>
        <input
          type="text"
          name="title"
          value={proposal.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Proposal Content
        </label>
        <textarea
          name="content"
          value={proposal.content}
          onChange={handleChange}
          rows={10}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Budget (in currency units)
          </label>
          <input
            type="number"
            name="budget"
            value={proposal.budget}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Timeline (in days)
          </label>
          <input
            type="number"
            name="timeline"
            value={proposal.timeline}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Proposal
        </button>
      </div>
    </form>
  );
}
