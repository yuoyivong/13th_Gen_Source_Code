package spring.monster.todowebminiproject002.service.serviceImpl;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import spring.monster.todowebminiproject002.configuration.CurrentUserConfig;
import spring.monster.todowebminiproject002.exception.ResourceNotFoundException;
import spring.monster.todowebminiproject002.exception.ValidationException;
import spring.monster.todowebminiproject002.model.dto.request.WorkspaceRequest;
import spring.monster.todowebminiproject002.model.entity.UserInfo;
import spring.monster.todowebminiproject002.model.entity.Workspace;
import spring.monster.todowebminiproject002.repository.WorkspaceRepository;
import spring.monster.todowebminiproject002.service.UserInfoService;
import spring.monster.todowebminiproject002.service.WorkspaceService;

import java.util.List;
import java.util.UUID;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final CurrentUserConfig currentUserConfig;
    private final UserInfoService userInfoService;

    public WorkspaceServiceImpl(WorkspaceRepository workspaceRepository, CurrentUserConfig currentUserConfig, UserInfoService userInfoService) {
        this.workspaceRepository = workspaceRepository;
        this.currentUserConfig = currentUserConfig;
        this.userInfoService = userInfoService;
    }

    @Override
    public List<Workspace> getAllWorkspaces(int pageNo, int pageSize, String sortBy, String sortDirection) {
        UUID userId = currentUserConfig.getCurrentUserId();

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        return workspaceRepository.findWorkspacesByUserId(userId, pageable);
    }

    @Override
    public Workspace getWorkspaceById(UUID workspaceId) {
        UUID userId = currentUserConfig.getCurrentUserId();
        Workspace workspace = workspaceRepository.findWorkspaceByUserIdAndWorkspaceId(userId, workspaceId);

//        check if workspace exist or not
        validateWorkspace(workspace);

        return workspace;
    }

    @Override
    public Workspace createWorkspace(WorkspaceRequest workspaceRequest) {
//        get current user id
        UUID userId = currentUserConfig.getCurrentUserId();
        UserInfo userInfo = userInfoService.getUserById(userId);

        validateWorkspaceField(workspaceRequest);

        Workspace workspace = new Workspace();
        workspace.setWorkspaceName(workspaceRequest.getWorkspaceName());
        workspace.setUser(userInfo);
        workspace.setIsFavorite(false);
        return workspaceRepository.save(workspace);
    }

    @Override
    @Transactional
    public Workspace updateWorkspaceById(UUID workspaceId, WorkspaceRequest workspaceRequest) {
        UUID userId = currentUserConfig.getCurrentUserId();

        Workspace workspace = workspaceRepository.findWorkspaceByUserIdAndWorkspaceId(userId, workspaceId);

        validateWorkspace(workspace);
        validateWorkspaceField(workspaceRequest);

//        update field
        workspace.setWorkspaceName(workspaceRequest.getWorkspaceName());

        return workspace;
    }

    @Override
    @Transactional
    public void deleteWorkspaceById(UUID workspaceId) {
        UUID userId = currentUserConfig.getCurrentUserId();

        Workspace workspace = workspaceRepository.findWorkspaceByUserIdAndWorkspaceId(userId, workspaceId);

        validateWorkspace(workspace);

        workspaceRepository.deleteWorkspaceByIdAndUserId(workspaceId, userId);
    }

    @Override
    @Transactional
    public Workspace updateWorkspaceFavorite(UUID workspaceId, boolean isFavorite) {
        UUID userId = currentUserConfig.getCurrentUserId();
        Workspace workspace = workspaceRepository.findWorkspaceByUserIdAndWorkspaceId(userId, workspaceId);

        validateWorkspace(workspace);

        workspace.setIsFavorite(isFavorite);
        return workspace;
    }

//    validate if workspace is not found
    private void validateWorkspace(Workspace workspace) {
        if(workspace == null) {
            throw new ResourceNotFoundException("Workspace not found");
        }
    }

//    check available workspace and field
    private void validateWorkspaceField(WorkspaceRequest workspaceRequest) {
        if(!StringUtils.hasText(workspaceRequest.getWorkspaceName())) {
            throw new ValidationException("Workspace name cannot be empty.");
        }
    }

}
