import type { Metadata } from "next";
import { Geist, Rubik } from "next/font/google";
import "../globals.css";
import Breadcrumb from "./_components/Breadcrumb";

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

export default function ViewCardDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} ${geistSans.variable} antialiased bg-ghost-white`}
      >
        <div className="container mx-auto mt-18 text-dark-blue">
          <Breadcrumb />
          {children}
        </div>
      </body>
    </html>
  );
}
