import type { Metadata } from "next";
import "../../../globals.css";
import Logo from "@/components/logo";
import SidebarComponent from "../../_components/sidebar";
import { UUID } from "crypto";
import { WorkspaceType } from "@/interface/workspace-type";

export const metadata: Metadata = {
  title: {
    template: "%s | Monster",
    default: "Todo List | Monster",
  },
  description: "Homework 006 - Next.js",
};

export default async function AuthenticationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: WorkspaceType["workspaceId"] }>;
}) {
  return (
    <html lang="en">
      <body className="text-charcoal bg-ghost-white w-full flex">
        <div className="w-1/5 ">
          <div className="m-16 text-center">
            <Logo />
          </div>
          <SidebarComponent workspaceId={(await params)?.workspaceId} />
        </div>

        <div className="w-4/5">{children}</div>
      </body>
    </html>
  );
}
