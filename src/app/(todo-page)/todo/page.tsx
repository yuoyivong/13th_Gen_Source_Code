import { auth } from "@/auth";
import { APIResponse } from "@/interface/api-response";
import { WorkspaceType } from "@/interface/workspace-type";
import { getAllWorkspaces } from "@/services/workspace-service";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();
  const workspaceList = (
    session ? await getAllWorkspaces() : null
  ) as APIResponse<WorkspaceType[]>;
  const firstWorkspaceId = workspaceList?.payload[0]?.workspaceId || null;
  console.log("first workspace : ", firstWorkspaceId);
  if (firstWorkspaceId) {
    redirect(`/todo/${firstWorkspaceId}?q=workspace`);
  }

  return <div>page</div>;
}
