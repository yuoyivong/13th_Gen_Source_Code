import Logo from "@/components/logo";
import React from "react";
import SidebarComponent from "../../_components/sidebar";
import { WorkspaceType } from "@/interface/workspace-type";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: WorkspaceType["workspaceId"] }>;
}) {
  return (
    <div className="flex">
      <div className="w-1/5">
        <div className="m-16 text-center  sticky top-20 z-20">
          <Logo />
        </div>
        <div className="sticky top-44">
          <SidebarComponent workspaceId={(await params)?.workspaceId} />
        </div>
      </div>

      <div className="w-4/5">{children}</div>
    </div>
  );
}
