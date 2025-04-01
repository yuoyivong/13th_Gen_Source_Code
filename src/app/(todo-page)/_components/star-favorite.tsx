"use client";
import { updateWorkspaceFavoriteStatusAction } from "@/actions/workspace-action";
import { WorkspaceType } from "@/interface/workspace-type";
import { Star1 } from "iconsax-react";
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
      {!isFavorite ? (
        <Star1 size="24" color="#94a3b8" variant="Broken" />
      ) : (
        <Star size="24" fill="#FBBC05" stroke="#FBBC05" />
      )}
    </div>
  );
}
