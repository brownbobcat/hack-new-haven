// src/app/citizen/dashboard/page.tsx
import Link from "next/link";

export default function CitizenDashboardPage() {
  return (
    <main className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Citizen Dashboard</h1>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-500"
          >
            Logout
          </Link>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, Citizen</h2>

          <p className="mb-4">
            You have successfully accessed the citizen dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-4 border rounded bg-purple-50">
              <h3 className="font-medium mb-2">Available Services</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Submit applications</li>
                <li>Check application status</li>
                <li>View documents</li>
                <li>Receive notifications</li>
              </ul>
            </div>

            <div className="p-4 border rounded bg-purple-50">
              <h3 className="font-medium mb-2">Recent Activity</h3>
              <p className="text-gray-700">No recent activities to display.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
