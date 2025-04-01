import React from "react";
import WorkspaceTodoHeader from "./workspace-todo-header";
import UserProfile from "./user-profile";
import { WorkspaceType } from "@/interface/workspace-type";

export default function TodoHeader({
  q,
  workspaceName,
}: {
  q: { q: string };
  workspaceName: WorkspaceType["workspaceName"];
}) {
  console.log(q);

  return (
    <div className="flex justify-between items-center border-b border-b-gray-300 pb-3 mb-6 px-20 z-50">
      <WorkspaceTodoHeader q={q} workspaceName={workspaceName} />
      <UserProfile />
    </div>
  );
}
