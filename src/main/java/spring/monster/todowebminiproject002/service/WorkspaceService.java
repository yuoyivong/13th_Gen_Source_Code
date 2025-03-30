package spring.monster.todowebminiproject002.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import spring.monster.todowebminiproject002.model.dto.request.WorkspaceRequest;
import spring.monster.todowebminiproject002.model.dto.response.WorkspaceResponse;

import java.util.List;
import java.util.UUID;

public interface WorkspaceService {

    //    get all workspaces
    List<WorkspaceResponse> getAllWorkspaces(int pageNo, int pageSize, String sortBy, String sortDirection);

    //    get workspace by id
    WorkspaceResponse getWorkspaceById(UUID workspaceId);

    //    create new workspace
    WorkspaceResponse createWorkspace(WorkspaceRequest workspaceRequest);

    //    update workspace by id
    WorkspaceResponse updateWorkspaceById(UUID workspaceId, WorkspaceRequest workspaceRequest);

    //    delete workspace by id
    void deleteWorkspaceById(UUID workspaceId);

}
