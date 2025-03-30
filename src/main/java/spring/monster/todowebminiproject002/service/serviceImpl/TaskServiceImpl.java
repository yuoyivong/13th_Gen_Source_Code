package spring.monster.todowebminiproject002.service.serviceImpl;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import spring.monster.todowebminiproject002.enumeration.Status;
import spring.monster.todowebminiproject002.model.dto.request.TaskRequest;
import spring.monster.todowebminiproject002.model.dto.response.TaskResponse;
import spring.monster.todowebminiproject002.model.entity.Task;
import spring.monster.todowebminiproject002.model.entity.Workspace;
import spring.monster.todowebminiproject002.repository.TaskRepository;
import spring.monster.todowebminiproject002.service.TaskService;
import spring.monster.todowebminiproject002.service.WorkspaceService;

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

        return taskRepository.findTasksByWorkspaceId(workspaceId, pageable);
    }

    @Override
    public Task getTaskById(UUID taskId, UUID workspaceId) {
        return taskRepository.findTaskByTaskIdAndWorkspaceId(taskId, workspaceId);
    }

    @Override
    public Task createTask(UUID workspaceId, TaskRequest taskRequest) {
        Workspace workspace = workspaceService.getWorkspaceById(workspaceId);

        Task task = new Task();
        task.setTaskTitle(taskRequest.getTaskTitle());
        task.setDetails(taskRequest.getTaskDetails());
        task.setTag(taskRequest.getTag());
        task.setStatus(Status.NOT_STARTED);
        task.setStartDate(new Date());
        task.setWorkspace(workspace);

        return taskRepository.save(task);
    }

    @Override
    @Transactional
    public Task updateTaskById(UUID workspaceId, UUID taskId, TaskRequest taskRequest) {
        Task task = taskRepository.findTaskByTaskIdAndWorkspaceId(taskId, workspaceId);

        assert task != null;
        task.setTaskTitle(taskRequest.getTaskTitle());
        task.setDetails(taskRequest.getTaskDetails());
        task.setTag(taskRequest.getTag());
        task.setEndDate(new Date());

        return task;
    }

    @Transactional
    @Override
    public void deleteTaskById(UUID workspaceId, UUID taskId) {
        taskRepository.deleteTaskByTaskIdAndWorkspaceId(workspaceId, taskId);
    }
}
