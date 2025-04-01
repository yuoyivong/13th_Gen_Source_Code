"use server";

import { WorkspaceType } from "@/interface/workspace-type";
import {
  createNewWorkspace,
  getWorkspaceById,
  updateWorkspace,
  updateWorkspaceFavoriteStatus,
} from "@/services/workspace-service";
import { revalidateTag } from "next/cache";

// create new workspace action
const createWorkspaceAction = async (
  workspaceName: WorkspaceType["workspaceName"]
) => {
  const newWorkspace = await createNewWorkspace(workspaceName);
  revalidateTag("workspaces");
  return newWorkspace;
};

// update workspace action
const updateWorkspaceAction = async (
  workspaceId: WorkspaceType["workspaceId"],
  workspaceName: WorkspaceType["workspaceName"]
) => {
  const updatedWorkspace = await updateWorkspace(workspaceId, workspaceName);
  revalidateTag("workspaces");
  return updatedWorkspace;
};

// update workspace favorite status action
const updateWorkspaceFavoriteStatusAction = async (
  workspaceId: WorkspaceType["workspaceId"],
  isFavorite: WorkspaceType["isFavorite"]
) => {
  const updateFavoriteWorkspace = await updateWorkspaceFavoriteStatus(
    workspaceId,
    isFavorite
  );
  revalidateTag("workspaces");
  return updateFavoriteWorkspace;
};

// get workspace by id
const getWorkspaceByIdAction = async (
  workspaceId: WorkspaceType["workspaceId"]
) => {
  const workspace = await getWorkspaceById(workspaceId);
  return workspace;
};

// expose methods
export {
  createWorkspaceAction,
  updateWorkspaceAction,
  updateWorkspaceFavoriteStatusAction,
  getWorkspaceByIdAction,
};
