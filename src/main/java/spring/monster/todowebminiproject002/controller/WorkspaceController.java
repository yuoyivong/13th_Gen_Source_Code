package spring.monster.todowebminiproject002.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spring.monster.todowebminiproject002.model.dto.request.WorkspaceRequest;
import spring.monster.todowebminiproject002.model.dto.response.APIResponse;
import spring.monster.todowebminiproject002.model.dto.response.WorkspaceResponse;
import spring.monster.todowebminiproject002.service.WorkspaceService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@SecurityRequirement(name = "bearerAuth")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

//    create new workspace
    @PostMapping("/workspace")
    @Operation(summary = "Create new workspace")
    public ResponseEntity<APIResponse<WorkspaceResponse>> createWorkspace(@RequestBody WorkspaceRequest workspaceRequest) {
        APIResponse<WorkspaceResponse> response = new APIResponse<>(
                "Create new workspace successfully!",
                HttpStatus.CREATED,
                workspaceService.createWorkspace(workspaceRequest)
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

//    get all workspaces
    @GetMapping("/workspaces")
    @Operation(summary = "Get all workspaces")
    public ResponseEntity<APIResponse<List<WorkspaceResponse>>> getAllWorkspaces(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "workspaceId") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection) {
        APIResponse<List<WorkspaceResponse>> response = new APIResponse<>(
                "Get all workspaces successfully!",
                HttpStatus.OK,
                workspaceService.getAllWorkspaces(pageNo, pageSize, sortBy, sortDirection)
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    get workspace by id
    @GetMapping("/workspace/{workspace-id}")
    @Operation(summary = "Get all workspace by id")
    public ResponseEntity<APIResponse<WorkspaceResponse>> getWorkspaceById(@PathVariable("workspace-id") UUID workspaceId) {
        APIResponse<WorkspaceResponse> response = new APIResponse<>(
                "Get workspace with id " + workspaceId + " successfully",
                HttpStatus.OK,
                workspaceService.getWorkspaceById(workspaceId)
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    update workspace by id
    @PutMapping("/workspace/{workspace-id}")
    @Operation(summary = "Update workspace by id")
    public ResponseEntity<APIResponse<WorkspaceResponse>> updateWorkspace(@PathVariable("workspace-id") UUID workspaceId, @RequestBody WorkspaceRequest workspaceRequest) {
        APIResponse<WorkspaceResponse> response = new APIResponse<>(
                "Update workspace with id " + workspaceId + " successfully!",
                HttpStatus.OK,
                workspaceService.updateWorkspaceById(workspaceId, workspaceRequest)
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    delete workspace by id
    @DeleteMapping("/workspace/{workspace-id}")
    @Operation(summary = "Delete workspace by id")
    public ResponseEntity<APIResponse<Void>> deleteWorkspace(@PathVariable("workspace-id") UUID workspaceId) {
        workspaceService.deleteWorkspaceById(workspaceId);

        APIResponse<Void> response = new APIResponse<>(
                "Delete workspace with id " + workspaceId + " successfully!",
                HttpStatus.OK,
                null
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
