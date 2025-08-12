import type React from "react";
import type { Metadata } from "next";
import "@/assets/styles/index.css";

export const metadata: Metadata = {
  title: "violet Login - Authentication",
  description: "Beautiful login and signup pages with violet and cyan theme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
