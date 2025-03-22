// src/app/citizen/register/page.tsx
import Link from "next/link";

export default function CitizenRegisterPage() {
  return (
    <main className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Citizen Registration</h1>
          <p className="text-gray-600 mt-2">This feature is coming soon</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <p className="text-center mb-4">
            Citizen registration functionality is currently in development.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
