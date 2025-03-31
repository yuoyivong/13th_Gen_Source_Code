package spring.monster.todowebminiproject002.service;

import spring.monster.todowebminiproject002.model.dto.request.WorkspaceRequest;
import spring.monster.todowebminiproject002.model.entity.Workspace;

import java.util.List;
import java.util.UUID;

public interface WorkspaceService {

    //    get all workspaces
    List<Workspace> getAllWorkspaces(int pageNo, int pageSize, String sortBy, String sortDirection);

    //    get workspace by id
    Workspace getWorkspaceById(UUID workspaceId);

    //    create new workspace
    Workspace createWorkspace(WorkspaceRequest workspaceRequest);

    //    update workspace by id
    Workspace updateWorkspaceById(UUID workspaceId, WorkspaceRequest workspaceRequest);

    //    delete workspace by id
    void deleteWorkspaceById(UUID workspaceId);

//    update workspace favorite status
    Workspace updateWorkspaceFavorite(UUID workspaceId, boolean isFavorite);

}
