
import type React from "react";
import Navigation from "../Navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">


        <div className="flex-1 flex flex-col min-h-screen">
          <Navigation/>

          {/* Page Content */}
          <main className="flex-1 bg-gray-100/50">
            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
