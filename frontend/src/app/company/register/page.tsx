// src/app/company/register/page.tsx
import CompanyRegisterForm from "@/app/components/company/RegisterForm";
import Link from "next/link";

export default function CompanyRegisterPage() {
  return (
    <main className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Company Registration</h1>
          <p className="text-gray-600 mt-2">Create a new company account</p>
        </div>

        <CompanyRegisterForm />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have a company account?{" "}
            <Link
              href="/company/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/register"
            className="text-sm font-medium text-gray-600 hover:text-gray-500"
          >
            ← Back to registration selection
          </Link>
        </div>
      </div>
    </main>
  );
}
