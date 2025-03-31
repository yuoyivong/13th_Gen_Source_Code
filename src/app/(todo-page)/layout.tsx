import type { Metadata } from "next";
import "../globals.css";
import Logo from "@/components/logo";
import SidebarComponent from "./_components/sidebar";

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
      <body className="text-charcoal bg-ghost-white w-full flex">
        <div className="w-1/5">
          <div className="m-16 text-center">
            <Logo />
          </div>
          <SidebarComponent />
        </div>

        <div className="w-4/5">{children}</div>
      </body>
    </html>
  );
}
