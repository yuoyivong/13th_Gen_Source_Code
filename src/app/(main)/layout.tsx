import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../globals.css";
import NavbarComponent from "@/components/navbar";
import FooterComponent from "@/components/footer";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "% | Monster",
    default: "Memory | Monster",
  },
  description: "Memory is what we should remember.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} text-dark-blue antialiased h-screen flex flex-col justify-between space-y-10`}
      >
        <div className="space-y-5">
          {/* navbar */}
          <NavbarComponent />
          {children}
        </div>
        <FooterComponent />
      </body>
    </html>
  );
}
