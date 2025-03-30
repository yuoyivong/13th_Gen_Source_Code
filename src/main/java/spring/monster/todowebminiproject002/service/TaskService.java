package spring.monster.todowebminiproject002.service;

import spring.monster.todowebminiproject002.model.dto.request.TaskRequest;
import spring.monster.todowebminiproject002.model.entity.Task;

import java.util.List;
import java.util.UUID;

public interface TaskService {

    //    get all tasks
    List<Task> getAllTasks(UUID workspaceId, int pageNo, int pageSize, String sortBy, String sortDirection);

    //    get task by id
    Task getTaskById(UUID taskId, UUID workspaceId);

    //    create new task
    Task createTask(UUID workspaceId, TaskRequest taskRequest);

    //    update task by id
    Task updateTaskById(UUID workspaceId, UUID taskId, TaskRequest taskRequest);

    //    delete task by id
    void deleteTaskById(UUID workspaceId, UUID taskId);
}
