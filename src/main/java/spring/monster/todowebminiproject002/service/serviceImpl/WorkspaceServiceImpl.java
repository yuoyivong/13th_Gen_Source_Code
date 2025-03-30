package spring.monster.todowebminiproject002.service.serviceImpl;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import spring.monster.todowebminiproject002.configuration.CurrentUserConfig;
import spring.monster.todowebminiproject002.model.dto.request.WorkspaceRequest;
import spring.monster.todowebminiproject002.model.dto.response.WorkspaceResponse;
import spring.monster.todowebminiproject002.model.entity.UserInfo;
import spring.monster.todowebminiproject002.model.entity.Workspace;
import spring.monster.todowebminiproject002.repository.WorkspaceRepository;
import spring.monster.todowebminiproject002.service.UserInfoService;
import spring.monster.todowebminiproject002.service.WorkspaceService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
    public List<WorkspaceResponse> getAllWorkspaces(int pageNo, int pageSize, String sortBy, String sortDirection) {
        UUID userId = currentUserConfig.getCurrentUserId();

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        List<Workspace> workspaceList = workspaceRepository.findWorkspacesByUserId(userId, pageable);

        return workspaceList.stream().map(Workspace::toResponseDTO).collect(Collectors.toList());
    }

    @Override
    public WorkspaceResponse getWorkspaceById(UUID workspaceId) {
        UUID userId = currentUserConfig.getCurrentUserId();
        return workspaceRepository.findWorkspaceByUserIdAndWorkspaceId(userId, workspaceId).toResponseDTO();
    }

    @Override
    public WorkspaceResponse createWorkspace(WorkspaceRequest workspaceRequest) {
//        get current user id
        UUID userId = currentUserConfig.getCurrenUser().getUserId();
        UserInfo userInfo = userInfoService.getUserById(userId);

        Workspace workspace = new Workspace();
        workspace.setWorkspaceName(workspaceRequest.getWorkspaceName());
        workspace.setUser(userInfo);
        return workspaceRepository.save(workspace).toResponseDTO();
    }

    @Override
    @Transactional
    public WorkspaceResponse updateWorkspaceById(UUID workspaceId, WorkspaceRequest workspaceRequest) {
        UUID userId = currentUserConfig.getCurrenUser().getUserId();

        Workspace workspace = workspaceRepository.findWorkspaceByUserIdAndWorkspaceId(userId, workspaceId);

//        update field
        assert workspace != null;
        workspace.setWorkspaceName(workspaceRequest.getWorkspaceName());

        return workspace.toResponseDTO();
    }

    @Override
    @Transactional
    public void deleteWorkspaceById(UUID workspaceId) {
        UUID userId = currentUserConfig.getCurrenUser().getUserId();
        workspaceRepository.deleteWorkspaceByIdAndUserId(workspaceId, userId);
    }
}
