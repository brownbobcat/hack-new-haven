// src/types/proposal.ts
export interface Proposal {
  id: string;
  companyName: string;
  title: string;
  content: string;
  budget: number;
  timeline: number;
  score?: number;
  evaluation?: ProposalEvaluation;
}

export interface ProposalEvaluation {
  technicalScore: number;
  financialScore: number;
  timelineScore: number;
  innovationScore: number;
  feasibilityScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  summary: string;
}

export interface TenderRequirements {
  title: string;
  description: string;
  budgetRange: {
    min: number;
    max: number;
  };
  timelineRange: {
    min: number;
    max: number;
  };
  technicalRequirements: string[];
  keyDeliverables: string[];
}
