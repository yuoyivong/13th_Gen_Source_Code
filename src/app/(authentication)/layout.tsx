import type { Metadata } from "next";
import "../globals.css";
import Logo from "@/components/logo";

export const metadata: Metadata = {
  title: {
    template: "%s | Monster",
    default: "Todo List | Monster",
  },
  description: "Homework 006 - Next.js",
};

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-charcoal bg-ghost-white">
        <div className="container mx-auto my-12">
          <Logo />
        </div>

        {children}
      </body>
    </html>
  );
}
