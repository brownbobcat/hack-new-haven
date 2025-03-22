// src/app/api/proposals/compare/route.ts
import { NextRequest, NextResponse } from "next/server";
import { compareProposals } from "@/services/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { evaluations, requirements } = body;

    if (!evaluations || !requirements || !Array.isArray(evaluations)) {
      return NextResponse.json(
        { error: "Evaluations array and requirements are required" },
        { status: 400 }
      );
    }

    const comparison = await compareProposals(evaluations, requirements);

    return NextResponse.json({ comparison });
  } catch (error) {
    console.error("Error comparing proposals:", error);
    return NextResponse.json(
      { error: "Failed to compare proposals" },
      { status: 500 }
    );
  }
}
