import { APIResponse } from "@/interface/api-response";
import { WorkspaceType } from "@/interface/workspace-type";
import getRandomColorClass from "@/lib/generate-random-color";
import { getAllWorkspaces } from "@/services/workspace-service";
import React from "react";
import Link from "next/link";
import { LogoutCurve, More, Star1 } from "iconsax-react";
import AddUpdateWorkspacePopup from "./add-update-workspace";
import WorkspaceComponent from "./workspace";

export default async function SidebarComponent({
  workspaceId,
}: {
  workspaceId: WorkspaceType["workspaceId"];
}) {
  const workspaceList = (await getAllWorkspaces()) as APIResponse<
    WorkspaceType[]
  >;

  return (
    <aside className="space-y-14">
      {/* workspace */}
      <div className="h-72 overflow-y-auto mb-10">
        <h2 className="flex gap-2 items-center text-xl text-light-steel-blue justify-between sticky top-0 bg-ghost-white px-6 py-2 z-10">
          Workspace <AddUpdateWorkspacePopup edit={false} />
        </h2>

        {workspaceList?.payload?.map((workspace, index) => (
          <WorkspaceComponent
            key={workspace?.workspaceId}
            workspace={workspace}
            index={index}
            id={workspaceId}
            name="workspace"
          />
        ))}
      </div>

      {/* favorite workspace */}
      <div className="h-72 overflow-y-auto">
        <h2 className="flex gap-2 items-center text-xl text-light-steel-blue justify-between sticky top-0 bg-ghost-white px-6 py-2 z-10">
          Favorite <Star1 size="24" color="#94a3b8" variant="Broken" />
        </h2>

        {workspaceList?.payload?.map(
          (workspace, index) =>
            workspace?.isFavorite && (
              <WorkspaceComponent
                key={workspace?.workspaceId}
                workspace={workspace}
                index={index}
                id={workspaceId}
                name="favorite"
              />
            )
        )}
      </div>

      <p className="mx-6 flex gap-2 items-center text-xl text-persian-green ">
        <LogoutCurve size="20" color="#009990" variant="Broken" /> Logout
      </p>
    </aside>
  );
}
