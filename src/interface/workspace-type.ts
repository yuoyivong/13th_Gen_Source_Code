import { UUID } from "crypto";

export interface WorkspaceType {
  workspaceId: UUID;
  workspaceName: string;
  isFavorite: boolean;
}
