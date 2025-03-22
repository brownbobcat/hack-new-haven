// src/services/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const initGeminiAPI = () => {
  // const apiKey = process.env.GEMINI_API_KEY;
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
};

// Evaluate a single proposal
export const evaluateProposal = async (
  proposal: string,
  requirements: string
) => {
  try {
    const model = initGeminiAPI();

    const prompt = `
You are an expert in evaluating tender/contract proposals. Analyze the following proposal against the tender requirements.

TENDER REQUIREMENTS:
${requirements}

PROPOSAL:
${proposal}

Evaluate this proposal on the following criteria with a score from 1-10 for each:
1. Technical merit: How well does the proposal address the technical requirements?
2. Financial feasibility: Is the budget reasonable and well-allocated?
3. Timeline: Is the proposed timeline realistic and efficient?
4. Innovation: Does the proposal offer innovative solutions?
5. Overall feasibility: How feasible is the implementation of this proposal?

For each criterion, provide a brief justification for your score.

Then provide:
1. A list of 3-5 key strengths
2. A list of 3-5 key weaknesses or areas for improvement
3. An overall evaluation summary (3-4 sentences)
4. A final overall score out of 100

Format your response as a JSON object with the following keys:
{
  "technicalScore": number,
  "financialScore": number,
  "timelineScore": number,
  "innovationScore": number,
  "feasibilityScore": number,
  "overallScore": number,
  "strengths": string[],
  "weaknesses": string[],
  "summary": string
}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse evaluation from AI response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error evaluating proposal:", error);
    throw error;
  }
};

// Compare multiple proposals and select the best one
export const compareProposals = async (
  evaluations: unknown[],
  requirements: string
) => {
  try {
    const model = initGeminiAPI();

    const evaluationsText = JSON.stringify(evaluations, null, 2);

    const prompt = `
You are an expert in selecting the best proposal for a tender/contract. You have evaluated multiple proposals and now need to select the best one.

TENDER REQUIREMENTS:
${requirements}

EVALUATED PROPOSALS:
${evaluationsText}

Based on these evaluations, analyze and determine which proposal best meets the requirements. Your analysis should:
1. Rank the proposals from best to worst
2. Explain why the top proposal is the best choice
3. Note any potential risks or concerns with the selected proposal
4. Suggest any amendments or negotiations that might improve the selected proposal

Format your response as a JSON object with the following keys:
{
  "rankings": [
    {
      "proposalId": string,
      "rank": number,
      "justification": string
    }
  ],
  "bestProposal": {
    "proposalId": string, 
    "justification": string
  },
  "risks": string[],
  "recommendedAmendments": string[]
}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse comparison from AI response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error comparing proposals:", error);
    throw error;
  }
};
