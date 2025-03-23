// app/api/company/login/route.ts (for App Router)
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { companyCode, password } = await req.json();

    // Use the exact endpoint you specified
    const response = await axios.get(
      `http://localhost:8080/api/v1/company/login?companyCode=${encodeURIComponent(
        companyCode
      )}&password=${encodeURIComponent(password)}`,
      {
        withCredentials: true,
      }
    );

    // Forward any cookies from the backend to the client
    const cookies = response.headers["set-cookie"];
    const headers = new Headers();

    if (cookies) {
      if (Array.isArray(cookies)) {
        cookies.forEach((cookie) => {
          headers.append("Set-Cookie", cookie);
        });
      } else {
        headers.append("Set-Cookie", cookies);
      }
    }

    // Return the response data along with any cookies
    return NextResponse.json(response.data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Login proxy error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Login failed" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
