import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Monster",
    default: "Todo List | Monster",
  },
  description: "Homework 006 - Next.js",
};

export default async function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-charcoal bg-ghost-white w-full ">{children}</body>
    </html>
  );
}
