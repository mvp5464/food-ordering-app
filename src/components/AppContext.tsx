"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function AppProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
