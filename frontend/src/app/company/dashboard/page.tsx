// src/app/company/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Company } from "@/types/company";
import { getCompanyProfile } from "@/services/api";
import Link from "next/link";

export default function CompanyDashboardPage() {
  const { data: session, status } = useSession();
  console.log("session", session);
  const router = useRouter();
  const [companyData, setCompanyData] = useState<Company | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/company/login");
    } else if (status === "authenticated" && session?.accessToken) {
      fetchCompanyData();
    }
  }, [status, session, router]);

  const fetchCompanyData = async () => {
    try {
      if (session?.accessToken) {
        const data = await getCompanyProfile(session.accessToken);
        setCompanyData(data);
      }
    } catch (err) {
      setError("Failed to load company data. Please try again later.");
      console.error("Error fetching company data:", err);
    } finally {
      // setLoading(false);
    }
  };

  // if (status === "loading" || loading) {
  //   return <div className="container mx-auto py-8">Loading...</div>;
  // }

  return (
    <main className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Company Dashboard</h1>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-500"
          >
            Logout
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {companyData ? (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              {companyData.companyName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Email:</strong> {companyData.email}
              </div>
              <div>
                <strong>Location:</strong> {companyData.location}
              </div>
              <div>
                <strong>Registration Number:</strong>{" "}
                {companyData.registrationNumber}
              </div>
              <div>
                <strong>Field/Area:</strong> {companyData.field}
              </div>
              <div>
                <strong>Company Size:</strong> {companyData.companySize}
              </div>
            </div>
          </div>
        ) : (
          <p>Unable to load company data</p>
        )}
      </div>
    </main>
  );
}
