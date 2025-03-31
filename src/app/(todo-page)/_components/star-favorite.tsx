"use client";
import { updateWorkspaceFavoriteStatusAction } from "@/actions/workspace-action";
import { WorkspaceType } from "@/interface/workspace-type";
import { Star } from "lucide-react";
import React from "react";

export default function StarFavorite({
  isFavorite,
  workspaceId,
}: {
  isFavorite: WorkspaceType["isFavorite"];
  workspaceId: WorkspaceType["workspaceId"];
}) {
  const handleChangeWorkspaceFavoriteStatus = async () => {
    
    await updateWorkspaceFavoriteStatusAction(workspaceId, !isFavorite);
  };

  return (
    <div
      onClick={handleChangeWorkspaceFavoriteStatus}
      className="cursor-pointer"
    >
      {!isFavorite ? <Star /> : <Star fill="#FBBC05" stroke="#FBBC05" />}
    </div>
  );
}
