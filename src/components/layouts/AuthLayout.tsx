"use client"; // Make this a Client Component

import type React from "react";
import type { Metadata } from "next";
import "@/assets/styles/index.css";
import { useEffect } from "react";
import { useUserStore } from "@/stores/User/User";

export const metadata: Metadata = {
  title: "violet Login - Authentication",
  description: "Beautiful login and signup pages with violet and cyan theme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchSelf } = useUserStore();

  useEffect(() => {
    fetchSelf();
  }, [fetchSelf]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
