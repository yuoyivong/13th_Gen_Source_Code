"use server";
import { Status } from "@/enum/status";
import { TaskRequst, TaskType } from "@/interface/task-type";
import { WorkspaceType } from "@/interface/workspace-type";
import {
  createNewTask,
  deleteTaskById,
  updateTask,
  updateTaskStatus,
} from "@/services/task-service";
import { revalidateTag } from "next/cache";

// update task status
const updateTaskStatusAction = async (
  taskId: TaskType["taskId"],
  workspaceId: WorkspaceType["workspaceId"],
  status: Status
) => {
  const newStatusToTask = await updateTaskStatus(taskId, workspaceId, status);
  console.log("New status : ", newStatusToTask);
  revalidateTag("tasks");
  return newStatusToTask;
};

// create new task
const createNewTaskAction = async (
  workspaceId: WorkspaceType["workspaceId"],
  taskRequest: TaskRequst
) => {
  const newTask = await createNewTask(workspaceId, taskRequest);
  revalidateTag("tasks");
  return newTask;
};

// update task
const updateTaskAction = async (
  workspaceId: WorkspaceType["workspaceId"],
  taskId: TaskType["taskId"],
  taskRequest: TaskRequst
) => {
  const updatedTask = await updateTask(workspaceId, taskId, taskRequest);
  revalidateTag("tasks");
  return updatedTask;
};

// delete task by id
const deleteTaskAction = async (
  workspaceId: WorkspaceType["workspaceId"],
  taskId: TaskType["taskId"]
) => {
  const deletedTask = await deleteTaskById(taskId, workspaceId);
  revalidateTag("tasks");
  return deletedTask;
};

// expose methods
export {
  updateTaskStatusAction,
  createNewTaskAction,
  deleteTaskAction,
  updateTaskAction,
};
