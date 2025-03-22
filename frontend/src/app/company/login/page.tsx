// src/app/company/login/page.tsx
import CompanyLoginForm from "@/app/components/company/LoginForm";
import Link from "next/link";

export default function CompanyLoginPage() {
  return (
    <main className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Company Login</h1>
          <p className="text-gray-600 mt-2">
            Enter your credentials to access your company dashboard
          </p>
        </div>

        <CompanyLoginForm />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have a company account?{" "}
            <Link
              href="/company/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-500"
          >
            ← Back to login selection
          </Link>
        </div>
      </div>
    </main>
  );
}
