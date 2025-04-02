import { WorkspaceType } from "@/interface/workspace-type";
import getRandomColorClass from "@/lib/generate-random-color";
import Link from "next/link";
import React from "react";
import AddUpdateWorkspacePopup from "./add-update-workspace";

export default function WorkspaceComponent({
  workspace,
  index,
  id,
  name,
}: {
  workspace: WorkspaceType;
  index: number;
  id: WorkspaceType["workspaceId"];
  name: string;
}) {
  return (
    <div
      className={`${
        workspace?.workspaceId === id ? "bg-light-steel-blue/5" : ""
      } flex justify-between items-center mt-2 py-3 px-7 w-full rounded-lg hover:bg-light-steel-blue/10`}
    >
      <Link
        href={{
          pathname: `/todo/${workspace?.workspaceId}`,
          query: {
            q: name,
          },
        }}
        className="w-full"
      >
        <div className="flex gap-3 items-center">
          <div
            className={`w-2 h-2 rounded-full ${getRandomColorClass(index)}`}
          ></div>
          <p className="font-semibold capitalize">{workspace?.workspaceName}</p>
        </div>
      </Link>

      <AddUpdateWorkspacePopup
        edit={true}
        workspaceId={workspace?.workspaceId}
      />
    </div>
  );
}
