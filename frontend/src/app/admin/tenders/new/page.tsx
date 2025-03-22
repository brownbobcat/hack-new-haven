// src/app/admin/tenders/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TenderRequirements } from "@/types/proposal";
import TenderForm from "@/components/TenderForm";

export default function NewTenderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (requirements: TenderRequirements) => {
    setIsSubmitting(true);

    try {
      // In a real implementation, you would save this to a database
      localStorage.setItem("tenderRequirements", JSON.stringify(requirements));
      router.push("/admin/tenders/proposals");
    } catch (error) {
      console.error("Error creating tender:", error);
      alert("Failed to create tender. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Create New Tender</h1>

      <div className="rounded-lg bg-white p-6 shadow">
        <TenderForm onSubmit={handleSubmit} />
      </div>

      {isSubmitting && (
        <div className="mt-4 text-center text-gray-600">
          Processing... Please wait.
        </div>
      )}
    </div>
  );
}
