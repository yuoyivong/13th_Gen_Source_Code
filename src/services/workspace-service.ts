import { WorkspaceType } from "@/interface/workspace-type";
import getRequestHeader from "@/lib/request-header";

// get all workspaces
const getAllWorkspaces = async () => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspaces`,
    {
      headers,
      next: { tags: ["workspaces"] },
    }
  );

  const workspaces = await response.json();
  return workspaces;
};

// get workspace by id
const getWorkspaceById = async (workspaceId: WorkspaceType["workspaceId"]) => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${workspaceId}`,
    {
      headers,
    }
  );

  const workspace = await response.json();
  return workspace;
};

// create new workspace
const createNewWorkspace = async (
  workspaceName: WorkspaceType["workspaceName"]
) => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(workspaceName),
    }
  );

  const newWorkspace = await response.json();
  return newWorkspace;
};

// update workspace
const updateWorkspace = async (
  workspaceId: WorkspaceType["workspaceId"],
  workspaceName: WorkspaceType["workspaceName"]
) => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${workspaceId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(workspaceName),
    }
  );

  const updatedWorkspace = await response.json();
  return updatedWorkspace;
};

// update workspace favorite status

const updateWorkspaceFavoriteStatus = async (
  workspaceId: WorkspaceType["workspaceId"],
  isFavorite: WorkspaceType["isFavorite"]
) => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${workspaceId}/favorite?favorite=${isFavorite}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify(isFavorite),
    }
  );

  const updatedWorkspace = await response.json();
  console.log("Updateed workspace : ", updatedWorkspace);

  return updatedWorkspace;
};

// expose methods
export {
  getAllWorkspaces,
  getWorkspaceById,
  createNewWorkspace,
  updateWorkspace,
  updateWorkspaceFavoriteStatus,
};
