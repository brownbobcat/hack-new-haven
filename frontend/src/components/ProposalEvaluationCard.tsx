// src/components/proposal/ProposalEvaluationCard.tsx
import { Proposal } from "@/types/proposal";

interface ProposalEvaluationCardProps {
  proposal: Proposal;
}

export default function ProposalEvaluationCard({
  proposal,
}: ProposalEvaluationCardProps) {
  const { companyName, title, budget, timeline, content, evaluation } =
    proposal;

  if (!evaluation) {
    return (
      <div className="rounded-lg border p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{companyName}</p>
        <div className="mt-4 space-y-2">
          <div>
            <span className="font-medium">Budget:</span> ${budget}
          </div>
          <div>
            <span className="font-medium">Timeline:</span> {timeline} days
          </div>
          <div>
            <span className="font-medium">Content:</span>
            <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">
              {content}
            </p>
          </div>
        </div>
        <p className="mt-4 text-yellow-600">Evaluation pending...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{companyName}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500">Budget: ${budget}</p>
          <p className="text-sm font-medium text-gray-500">
            Timeline: {timeline} days
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-md font-medium text-gray-900">Proposal Content</h4>
        <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">
          {content}
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-900">Evaluation Scores</h4>
        <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-5">
          <ScoreItem label="Technical" score={evaluation.technicalScore} />
          <ScoreItem label="Financial" score={evaluation.financialScore} />
          <ScoreItem label="Timeline" score={evaluation.timelineScore} />
          <ScoreItem label="Innovation" score={evaluation.innovationScore} />
          <ScoreItem label="Feasibility" score={evaluation.feasibilityScore} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h4 className="text-md font-medium text-gray-900">Overall Score</h4>
          <div className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
            {evaluation.overallScore}/100
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-900">Strengths</h4>
        <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
          {evaluation.strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="text-md font-medium text-gray-900">
          Areas for Improvement
        </h4>
        <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
          {evaluation.weaknesses.map((weakness, index) => (
            <li key={index}>{weakness}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="text-md font-medium text-gray-900">Summary</h4>
        <p className="mt-2 text-sm text-gray-700">{evaluation.summary}</p>
      </div>
    </div>
  );
}

function ScoreItem({ label, score }: { label: string; score: number }) {
  const getColorClass = (score: number) => {
    if (score >= 8) return "bg-green-100 text-green-800";
    if (score >= 6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <div
        className={`mt-1 rounded-full ${getColorClass(
          score
        )} px-2 py-1 text-xs font-medium`}
      >
        {score}/10
      </div>
    </div>
  );
}
