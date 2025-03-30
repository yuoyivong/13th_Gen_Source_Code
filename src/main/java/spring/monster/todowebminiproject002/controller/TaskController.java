package spring.monster.todowebminiproject002.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spring.monster.todowebminiproject002.model.dto.request.TaskRequest;
import spring.monster.todowebminiproject002.model.dto.response.APIResponse;
import spring.monster.todowebminiproject002.model.dto.response.TaskResponse;
import spring.monster.todowebminiproject002.model.entity.Task;
import spring.monster.todowebminiproject002.service.TaskService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
@SecurityRequirement(name = "bearerAuth")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    //    create new task
    @PostMapping("/task/workspace/{workspace-id}")
    @Operation(summary = "Create new task under a specific workspace")
    public ResponseEntity<APIResponse<TaskResponse>> createTask(@PathVariable("workspace-id") UUID workspaceId,
                                                                @RequestBody TaskRequest taskRequest) {
        APIResponse<TaskResponse> response = new APIResponse<>(
                "Create new task successfully!",
                HttpStatus.CREATED,
                taskService.createTask(workspaceId, taskRequest).toResponseDTO()
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //    get all tasks
    @GetMapping("/tasks/workspace/{workspace-id}")
    @Operation(summary = "Get all tasks from a particular workspace")
    public ResponseEntity<APIResponse<List<TaskResponse>>> getAllTasks(
            @PathVariable("workspace-id") UUID workspaceId,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "taskId") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection
    ) {

        List<TaskResponse> taskList =
                taskService.getAllTasks(workspaceId, pageNo, pageSize, sortBy, sortDirection)
                        .stream().map(Task::toResponseDTO).collect(Collectors.toList());

        APIResponse<List<TaskResponse>> response = new APIResponse<>(
                "Get all tasks successfully!",
                HttpStatus.OK,
                taskList
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //    get task by id
    @GetMapping("/task/{task-id}/workspace/{workspace-id}")
    @Operation(summary = "Get task by id from a workspace")
    public ResponseEntity<APIResponse<TaskResponse>> getTaskByIdAndWorkspaceId(
            @PathVariable("task-id") UUID taskId,
            @PathVariable("workspace-id") UUID workspaceId
    ) {
        APIResponse<TaskResponse> response = new APIResponse<>(
                "Get task with id " + taskId + " successfully!",
                HttpStatus.OK,
                taskService.getTaskById(taskId, workspaceId).toResponseDTO()
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //    update task by id
    @PutMapping("/task/{task-id}/workspace/{workspace-id}")
    @Operation(summary = "Update task by id")
    public ResponseEntity<APIResponse<TaskResponse>> updateTaskById(@PathVariable("task-id") UUID taskId,
                                                                    @PathVariable("workspace-id") UUID workspaceId,
                                                                    @RequestBody TaskRequest taskRequest) {
        APIResponse<TaskResponse> response = new APIResponse<>(
                "Update task with id " + taskId + " successfully!",
                HttpStatus.OK,
                taskService.updateTaskById(workspaceId, taskId, taskRequest).toResponseDTO()
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //    delete task by id
    @DeleteMapping("/task/{task-id}/workspace/{workspace-id}")
    @Operation(summary = "Delete task by id")
    public ResponseEntity<APIResponse<TaskResponse>> deleteTaskById(@PathVariable("task-id") UUID taskId,
                                                                    @PathVariable("workspace-id") UUID workspaceId) {
        taskService.deleteTaskById(workspaceId, taskId);

        APIResponse<TaskResponse> response = new APIResponse<>(
                "Delete task with id " + taskId + " successfully!",
                HttpStatus.OK,
                null
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
