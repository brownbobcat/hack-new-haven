// src/app/api/proposals/evaluate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { evaluateProposal } from "@/services/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proposal, requirements } = body;

    if (!proposal || !requirements) {
      return NextResponse.json(
        { error: "Proposal and requirements are required" },
        { status: 400 }
      );
    }

    const evaluation = await evaluateProposal(proposal, requirements);

    return NextResponse.json({ evaluation });
  } catch (error) {
    console.error("Error evaluating proposal:", error);
    return NextResponse.json(
      { error: "Failed to evaluate proposal" },
      { status: 500 }
    );
  }
}
