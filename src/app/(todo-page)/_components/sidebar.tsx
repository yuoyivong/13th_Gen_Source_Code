import { APIResponse } from "@/interface/api-response";
import { WorkspaceType } from "@/interface/workspace-type";
import getRandomColorClass from "@/lib/generate-random-color";
import { getAllWorkspaces } from "@/services/workspace-service";
import { Ellipsis, LogOut, SquarePlus, Star } from "lucide-react";
import React from "react";
import AddNewWorkspace from "./add-new-workspace";
import Link from "next/link";

export default async function SidebarComponent() {
  const workspaceList = (await getAllWorkspaces()) as APIResponse<
    WorkspaceType[]
  >;

  return (
    <aside className="space-y-6 sticky top-0">
      {/* workspace */}
      <div className="h-72 overflow-y-auto mb-8">
        <h2 className="flex gap-2 items-center text-xl text-light-steel-blue justify-between mx-6">
          Workspace <AddNewWorkspace />
        </h2>

        {workspaceList?.payload?.map((workspace, index) => (
          <div
            key={workspace?.workspaceId}
            className="flex justify-between items-center mt-2 bg-light-steel-blue/5 py-3 px-5 w-full rounded-lg "
          >
            <Link
              href={{
                pathname: `/todo/${workspace?.workspaceId}`,
                query: {
                  q: "workspace",
                },
              }}
              className="w-full"
            >
              <div className="flex gap-3 items-center">
                <div
                  className={`w-2 h-2 rounded-full ${getRandomColorClass(
                    index
                  )}`}
                ></div>
                <p className="font-semibold capitalize">
                  {workspace?.workspaceName}
                </p>
              </div>
            </Link>

            <Ellipsis />
          </div>
        ))}
      </div>

      {/* favorite workspace */}
      <div className="h-72 overflow-y-auto">
        <h2 className="flex gap-2 items-center text-xl text-light-steel-blue justify-between mx-6">
          Favorite <Star size={20} />
        </h2>

        {workspaceList?.payload?.map(
          (workspace, index) =>
            workspace?.isFavorite && (
              <div
                key={workspace?.workspaceId}
                className="flex justify-between items-center my-2 bg-light-steel-blue/5 py-3 px-5 w-full rounded-lg "
              >
                <Link
                  href={{
                    pathname: `/todo/${workspace?.workspaceId}`,
                    query: {
                      q: "favorite",
                    },
                  }}
                >
                  <div className="flex gap-3 items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${getRandomColorClass(
                        index
                      )}`}
                    ></div>
                    <p className="font-semibold capitalize">
                      {workspace?.workspaceName}
                    </p>
                  </div>
                </Link>

                <Ellipsis />
              </div>
            )
        )}
      </div>

      <p className="mx-6 flex gap-2 items-center text-xl text-light-steel-blue ">
        <LogOut /> Logout
      </p>
    </aside>
  );
}
