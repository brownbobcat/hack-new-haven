/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/admin/tenders/proposals/page.tsx
"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { Proposal, TenderRequirements } from "@/types/proposal";
import ProposalForm from "@/components/ProposalForm";
import ProposalEvaluationCard from "@/components/ProposalEvaluationCard";

export default function ProposalsPage() {
  //   const router = useRouter();
  const [requirements, setRequirements] = useState<TenderRequirements | null>(
    null
  );
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);

  useEffect(() => {
    // Load tender requirements from localStorage
    const requirementsJson = localStorage.getItem("tenderRequirements");
    if (requirementsJson) {
      setRequirements(JSON.parse(requirementsJson));
    }

    // Load any saved proposals
    const proposalsJson = localStorage.getItem("proposals");
    if (proposalsJson) {
      setProposals(JSON.parse(proposalsJson));
    }
  }, []);

  const handleProposalSubmit = async (proposal: Proposal) => {
    if (!requirements) {
      alert("Tender requirements not found.");
      return;
    }

    setIsLoading(true);

    try {
      // Convert requirements to string format for the API
      const requirementsString = `
        Title: ${requirements.title}
        Description: ${requirements.description}
        Budget Range: $${requirements.budgetRange.min} - $${
        requirements.budgetRange.max
      }
        Timeline Range: ${requirements.timelineRange.min} - ${
        requirements.timelineRange.max
      } days
        Technical Requirements: ${requirements.technicalRequirements
          .map((req, i) => `\n${i + 1}. ${req}`)
          .join("")}
        Key Deliverables: ${requirements.keyDeliverables
          .map((del, i) => `\n${i + 1}. ${del}`)
          .join("")}
      `;

      // Evaluate the proposal
      const response = await fetch("/proposals/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposal: `
            Company: ${proposal.companyName}
            Title: ${proposal.title}
            Budget: $${proposal.budget}
            Timeline: ${proposal.timeline} days
            Content: ${proposal.content}
          `,
          requirements: requirementsString,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate proposal");
      }

      const data = await response.json();

      // Add the evaluation to the proposal
      const evaluatedProposal = {
        ...proposal,
        evaluation: data.evaluation,
      };

      // Update the proposals list
      const updatedProposals = [...proposals, evaluatedProposal];
      setProposals(updatedProposals);

      // Save to localStorage
      localStorage.setItem("proposals", JSON.stringify(updatedProposals));

      // Reset comparison result when new proposal is added
      setComparisonResult(null);
    } catch (error) {
      console.error("Error evaluating proposal:", error);
      alert("Failed to evaluate proposal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompareProposals = async () => {
    if (!requirements || proposals.length < 2) {
      alert("Please add at least two proposals to compare.");
      return;
    }

    setIsLoading(true);

    try {
      // Convert requirements to string format for the API
      const requirementsString = `
        Title: ${requirements.title}
        Description: ${requirements.description}
        Budget Range: $${requirements.budgetRange.min} - $${
        requirements.budgetRange.max
      }
        Timeline Range: ${requirements.timelineRange.min} - ${
        requirements.timelineRange.max
      } days
        Technical Requirements: ${requirements.technicalRequirements
          .map((req, i) => `\n${i + 1}. ${req}`)
          .join("")}
        Key Deliverables: ${requirements.keyDeliverables
          .map((del, i) => `\n${i + 1}. ${del}`)
          .join("")}
      `;

      // Call the API to compare proposals
      const response = await fetch("/proposals/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          evaluations: proposals.map((p) => ({
            id: p.id,
            companyName: p.companyName,
            title: p.title,
            budget: p.budget,
            timeline: p.timeline,
            evaluation: p.evaluation,
          })),
          requirements: requirementsString,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to compare proposals");
      }

      const data = await response.json();
      setComparisonResult(data.comparison);
    } catch (error) {
      console.error("Error comparing proposals:", error);
      alert("Failed to compare proposals. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to view details of a specific proposal
  const handleViewProposal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
  };

  // Function to clear selected proposal
  const handleCloseProposalDetails = () => {
    setSelectedProposal(null);
  };

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Proposals Management</h1>

      {requirements ? (
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Tender Details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-md font-medium text-gray-900">Title</h3>
              <p className="text-gray-700">{requirements.title}</p>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900">
                Budget Range
              </h3>
              <p className="text-gray-700">
                ${requirements.budgetRange.min} - $
                {requirements.budgetRange.max}
              </p>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900">
                Timeline Range
              </h3>
              <p className="text-gray-700">
                {requirements.timelineRange.min} -{" "}
                {requirements.timelineRange.max} days
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-md font-medium text-gray-900">Description</h3>
            <p className="text-gray-700">{requirements.description}</p>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-lg bg-red-50 p-6 text-red-700">
          Tender requirements not found. Please create a tender first.
        </div>
      )}

      <div className="mb-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Add New Proposal</h2>
        <ProposalForm onSubmit={handleProposalSubmit} />
      </div>

      {isLoading && (
        <div className="mb-8 rounded-lg bg-blue-50 p-6 text-blue-700">
          Processing... This may take a moment while the AI evaluates the
          proposal.
        </div>
      )}

      {proposals.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="mb-4 text-xl font-bold">
              Evaluated Proposals ({proposals.length})
            </h2>
            {proposals.length >= 2 && (
              <button
                onClick={handleCompareProposals}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                disabled={isLoading}
              >
                Compare All Proposals
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="rounded-lg border p-4 shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => handleViewProposal(proposal)}
              >
                <h3 className="font-medium text-gray-900">{proposal.title}</h3>
                <p className="text-sm text-gray-500">{proposal.companyName}</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="text-sm">
                    <span className="font-medium">Budget:</span> $
                    {proposal.budget}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Timeline:</span>{" "}
                    {proposal.timeline} days
                  </div>
                </div>
                {proposal.evaluation && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Score:</span>
                    <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                      {proposal.evaluation.overallScore}/100
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedProposal.title}</h2>
              <button
                onClick={handleCloseProposalDetails}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ProposalEvaluationCard proposal={selectedProposal} />
          </div>
        </div>
      )}

      {comparisonResult && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">AI Selection Results</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Best Proposal
              </h3>
              <div className="mt-2 rounded-lg bg-green-50 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-green-800">
                    {proposals.find(
                      (p) => p.id === comparisonResult.bestProposal.proposalId
                    )?.companyName || "Unknown"}
                    {" - "}
                    {proposals.find(
                      (p) => p.id === comparisonResult.bestProposal.proposalId
                    )?.title || "Unknown"}
                  </h4>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    #1 Ranked
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  {comparisonResult.bestProposal.justification}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Rankings</h3>
              <div className="mt-2 overflow-hidden rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Proposal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Justification
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {comparisonResult.rankings.map((ranking: any) => {
                      const proposal = proposals.find(
                        (p) => p.id === ranking.proposalId
                      );
                      return (
                        <tr key={ranking.proposalId}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                              {ranking.rank}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {proposal?.companyName || "Unknown"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {proposal?.title || "Unknown"}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {ranking.justification}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Potential Risks
              </h3>
              <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
                {comparisonResult.risks.map((risk: string, index: number) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Recommended Amendments
              </h3>
              <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
                {comparisonResult.recommendedAmendments.map(
                  (amendment: string, index: number) => (
                    <li key={index}>{amendment}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
