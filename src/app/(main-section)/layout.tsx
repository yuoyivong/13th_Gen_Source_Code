import type { Metadata } from "next";
import { Geist, Rubik } from "next/font/google";
import "../globals.css";
import SidebarComponent from "@/app/(main-section)/_components/SidebarComponent";
import SearchComponent from "./_components/SearchComponent";
import HeaderComponent from "./_components/HeaderComponent";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Monster",
    default: "Homework005 | Monster",
  },
  description: "Homework 005",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} ${geistSans.variable}  antialiased`}>
        <div className="flex bg-ghost-white text-dark-blue">
          {/* sidebar */}
          <div className="w-1/5">
            <SidebarComponent />
          </div>

          {/* main content */}
          <div className="w-4/5 mt-8 space-y-6 px-16">
            <Suspense fallback={<p>Loading ...</p>}>
              <SearchComponent />
            </Suspense>
            <div className="bg-white p-12 rounded-t-[50px] h-auto">
              <Suspense fallback={<p>Loading ...</p>}>
                <HeaderComponent />
              </Suspense>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
