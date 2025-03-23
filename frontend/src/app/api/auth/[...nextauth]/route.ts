// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Define the direct login function
// In app/api/auth/[...nextauth]/route.ts
async function directLogin(credentials: {
  companyCode: string;
  password: string;
}) {
  try {
    // Use POST instead of GET
    const response = await axios.post(
      `http://localhost:8080/api/v1/company/login?companyCode=${encodeURIComponent(
        credentials.companyCode
      )}&password=${encodeURIComponent(credentials.password)}`,
      null, // No body needed as we're using query parameters
      {
        withCredentials: true,
      }
    );

    console.log("Direct login response:", response);

    return {
      success: true,
      companyData: response.data,
    };
  } catch (error) {
    console.error("Login error in NextAuth:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Error ${error.response?.status || ""}: Login failed`;

      return { success: false, message: errorMessage };
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        companyCode: { label: "Company Code", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.companyCode || !credentials?.password) {
          return null;
        }

        try {
          // Call the direct login function
          const result = await directLogin({
            companyCode: credentials.companyCode,
            password: credentials.password,
          });

          if (!result.success) {
            console.error("Login failed:", result.message);
            return null;
          }

          // Create a user object for NextAuth
          return {
            id: credentials.companyCode,
            name: result.companyData?.companyName || credentials.companyCode,
            email: result.companyData?.companyEmail || "",
            companyCode: credentials.companyCode,
            ...result.companyData, // Include all company data
          };
        } catch (error) {
          console.error("NextAuth authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the JWT token when signed in
      if (user) {
        token.user = user;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token }) {
      // Add user data to the session
      // if (token.user) {
      //   session.user = token.user;
      // }
      return session;
    },
  },
  pages: {
    signIn: "/company/login",
    error: "/company/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
