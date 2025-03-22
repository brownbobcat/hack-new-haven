// src/app/company/layout.tsx
import Providers from "@/components/Providers";
import { ReactNode } from "react";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
