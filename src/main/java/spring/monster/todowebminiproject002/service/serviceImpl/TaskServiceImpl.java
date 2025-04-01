package spring.monster.todowebminiproject002.service.serviceImpl;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import spring.monster.todowebminiproject002.enumeration.Status;
import spring.monster.todowebminiproject002.enumeration.Tag;
import spring.monster.todowebminiproject002.exception.InvalidEnumTypeException;
import spring.monster.todowebminiproject002.exception.ResourceNotFoundException;
import spring.monster.todowebminiproject002.exception.ValidationException;
import spring.monster.todowebminiproject002.model.dto.request.TaskRequest;
import spring.monster.todowebminiproject002.model.entity.Task;
import spring.monster.todowebminiproject002.model.entity.Workspace;
import spring.monster.todowebminiproject002.repository.TaskRepository;
import spring.monster.todowebminiproject002.service.TaskService;
import spring.monster.todowebminiproject002.service.WorkspaceService;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final WorkspaceService workspaceService;

    public TaskServiceImpl(TaskRepository taskRepository, WorkspaceService workspaceService) {
        this.taskRepository = taskRepository;
        this.workspaceService = workspaceService;
    }

    @Override
    public List<Task> getAllTasks(UUID workspaceId, int pageNo, int pageSize, String sortBy, String sortDirection) {

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        checkValidWorkspaceId(workspaceId);

        return taskRepository.findTasksByWorkspaceId(workspaceId, pageable);
    }

    @Override
    public Task getTaskById(UUID taskId, UUID workspaceId) {
        checkValidWorkspaceId(workspaceId);
        checkValidWorkspaceAndTask(taskId, workspaceId);

        return taskRepository.findTaskByTaskIdAndWorkspaceId(taskId, workspaceId);
    }

    @Override
    public Task createTask(UUID workspaceId, TaskRequest taskRequest) {

        Workspace workspace = workspaceService.getWorkspaceById(workspaceId);

        validateTaskField(taskRequest);

        Task task = new Task();
        task.setTaskTitle(taskRequest.getTaskTitle());
        task.setDetails(taskRequest.getTaskDetails());
        task.setTag(taskRequest.getTag());
        task.setStatus(Status.NOT_STARTED);
        task.setStartDate(new Date());
        task.setEndDate(taskRequest.getEndDate());
        task.setWorkspace(workspace);

        return taskRepository.save(task);
    }

    @Override
    @Transactional
    public Task updateTaskById(UUID workspaceId, UUID taskId, TaskRequest taskRequest) {

        checkValidWorkspaceId(workspaceId);
        checkValidWorkspaceAndTask(taskId, workspaceId);
        validateTaskField(taskRequest);

        Task task = taskRepository.findTaskByTaskIdAndWorkspaceId(taskId, workspaceId);

        assert task != null;
        task.setTaskTitle(taskRequest.getTaskTitle());
        task.setDetails(taskRequest.getTaskDetails());
        task.setTag(taskRequest.getTag());
        task.setEndDate(taskRequest.getEndDate());

        return task;
    }

    @Transactional
    @Override
    public void deleteTaskById(UUID workspaceId, UUID taskId) {
        checkValidWorkspaceId(workspaceId);
        checkValidWorkspaceAndTask(taskId, workspaceId);

        taskRepository.deleteTaskByTaskIdAndWorkspaceId(workspaceId, taskId);
    }

    @Override
    @Transactional
    public Task updateTaskStatus(UUID workspaceId, UUID taskId, Status status) {
        checkValidWorkspaceId(workspaceId);
        checkValidWorkspaceAndTask(taskId, workspaceId);

        Task task = taskRepository.findTaskByTaskIdAndWorkspaceId(taskId, workspaceId);
        task.setStatus(status);

        return task;
    }

    //    validate task
    //    check whether the workspace belongs to current user login or not
    private void checkValidWorkspaceId(UUID workspaceId) {
        Workspace workspace = workspaceService.getWorkspaceById(workspaceId);

        if (workspace == null) {
            throw new ResourceNotFoundException("Workspace not found.");
        }
    }

    //    check whether the task id and workspace id match or not
    private void checkValidWorkspaceAndTask(UUID taskId, UUID workspaceId) {
        Task task = taskRepository.findTaskByTaskIdAndWorkspaceId(taskId, workspaceId);

        if (task == null) {
            throw new ResourceNotFoundException("Task not found.");
        }
    }

    //   validate each task field
    private void validateTaskField(TaskRequest taskRequest) {
        // Validate task title
        if (!StringUtils.hasText(taskRequest.getTaskTitle())) {
            throw new ValidationException("Task title cannot be empty.");
        }

        // Validate task tag - ensure it is not null or empty and is a valid enum value
        String tag = String.valueOf(taskRequest.getTag()).trim();
        if (!StringUtils.hasText(tag)) {
            throw new ValidationException("Task tag cannot be empty.");
        }

        boolean isValid = Arrays.stream(Tag.values())
                .anyMatch(e -> e.name().equalsIgnoreCase(tag));

        if (!isValid) {
            String allowedTags = Arrays.stream(Tag.values())
                    .map(Enum::name)
                    .collect(Collectors.joining(", "));

            throw new InvalidEnumTypeException("Invalid tag: " + tag + ". Allowed values: " + allowedTags);
        }

        // Validate task end date
        if (taskRequest.getEndDate() == null) {
            throw new ValidationException("Task end date cannot be empty.");
        }
    }

}
