import { Status } from "@/enum/status";
import { TaskRequst, TaskType } from "@/interface/task-type";
import { WorkspaceType } from "@/interface/workspace-type";
import getRequestHeader from "@/lib/request-header";

// get all tasks
const getAllTasks = async (workspaceId: WorkspaceType["workspaceId"]) => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/tasks/workspace/${workspaceId}?pageNo=0&pageSize=10&sortBy=status&sortDirection=ASC`,
    {
      headers,
      next: { tags: ["tasks"] },
    }
  );

  const tasks = await response.json();
  return tasks;
};

// get task by id
const getTaskById = async () => {
  // const taskId = await 
}

// create new task
const createNewTask = async (
  workspaceId: WorkspaceType["workspaceId"],
  taskRequest: TaskRequst
) => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/workspace/${workspaceId}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(taskRequest),
    }
  );

  const newTask = await response.json();
  return newTask;
};

// update task status
const updateTaskStatus = async (
  taskId: TaskType["taskId"],
  workspaceId: WorkspaceType["workspaceId"],
  status: Status
) => {
  console.log("Stasfdasfs status : ", status, taskId, workspaceId);

  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}/status?status=${status}`,
    { method: "PATCH", headers }
  );

  const updatedTaskStatus = await response.json();
  console.log("update tasK : ", response);

  return updatedTaskStatus;
};

// update task
const updateTask = async (
  workspaceId: WorkspaceType["workspaceId"],
  taskId: TaskType["taskId"],
  taskRequest: TaskRequst
) => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(taskRequest),
    }
  );
  const updatedTask = await response.json();
  return updatedTask;
};

// delete task by id
const deleteTaskById = async (
  taskId: TaskType["taskId"],
  workspaceId: WorkspaceType["workspaceId"]
) => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}`,
    {
      method: "DELETE",
      headers,
    }
  );

  const message = await response.json();
  return message;
};



// expose methods
export {
  getAllTasks,
  createNewTask,
  updateTaskStatus,
  updateTask,
  deleteTaskById,
};
