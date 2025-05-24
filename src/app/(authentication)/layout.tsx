import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "% | Monster",
    default: "Auth | Monster",
  },
  description: "Memory is what we should remember.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} text-dark-blue`}>
        <div className="bg-white-smoke h-screen flex items-center w-full justify-center">
          <div className="flex lg:justify-between bg-white h-full w-full lg:h-3/4 lg:w-3/5 drop-shadow-steel-gray-xs lg:rounded-5xl p-5 lg:p-8">
            <div className="w-full mx-auto md:w-3/4 lg:w-1/2 lg:pl-7 lg:pr-16 flex flex-col justify-center space-y-10">
              {children}
            </div>

            {/* static image */}
            <div className="w-1/2 relative hidden lg:block">
              <Image
                src={
                  "https://i.pinimg.com/736x/12/4d/93/124d93d7d5dab93ced2124f5be4d3725.jpg"
                }
                fill
                alt="Boys in mountain"
                className="rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
