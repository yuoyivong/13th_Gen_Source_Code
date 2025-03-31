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
    }
  );

  const tasks = await response.json();
  return tasks;
};

// create new task
const createNewTask = async (
  workspaceId: WorkspaceType["workspaceId"],
  taskRequst: TaskRequst
) => {
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/workspace/${workspaceId}`,
    {
      headers,
      body: JSON.stringify(taskRequst),
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
  const headers = await getRequestHeader();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}/status/status=${status}`,
    {
      headers,
    }
  );

  const updatedTaskStatus = await response.json();
  return updatedTaskStatus;
};

// expose methods
export { getAllTasks, createNewTask, updateTaskStatus };
