import React from "react";
import CardComponent from "../../_components/card";
import AddNewTaskPopup from "../../_components/add-new-task";
import { UUID } from "crypto";
import { getWorkspaceById } from "@/services/workspace-service";
import { WorkspaceType } from "@/interface/workspace-type";
import { APIResponse } from "@/interface/api-response";
import StarFavorite from "../../_components/star-favorite";
import TodoHeader from "../../_components/todo-header";
import { getAllTasks } from "@/services/task-service";
import { TaskType } from "@/interface/task-type";
import { Status } from "@/enum/status";

export default async function TodoPage({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceId: UUID }>;
  searchParams: Promise<{ q: string }>;
}) {
  const { workspaceId } = await params;
  const { q } = await searchParams;

  // get workspace by workspaceId
  const workspace = (await getWorkspaceById(
    workspaceId
  )) as APIResponse<WorkspaceType>;

  // get tasks by workspace id
  const tasks = (await getAllTasks(workspaceId)) as APIResponse<TaskType[]>;

  // Filter tasks by status (group them by status)
  const notStartedTasks = tasks?.payload?.filter(
    (task) => task.status === Status.NOT_STARTED
  );
  const inProgressTasks = tasks?.payload?.filter(
    (task) => task.status === Status.IN_PROGRESS
  );
  const finishedTasks = tasks?.payload?.filter(
    (task) => task.status === Status.FINISHED
  );

  return (
    <div className="py-5">
      <TodoHeader q={q} workspaceName={workspace?.payload?.workspaceName} />
      <div className="flex justify-between items-center px-20">
        <h1 className="text-2xl font-bold capitalize">
          {workspace?.payload?.workspaceName}
        </h1>

        <div className="p-2 rounded-lg bg-light-steel-blue/10">
          <StarFavorite
            workspaceId={workspace?.payload?.workspaceId}
            isFavorite={workspace?.payload?.isFavorite}
          />
        </div>
      </div>

      {/* Status headers and tasks rendered once for each status */}
      <div className="grid grid-cols-3 mt-6 gap-10 px-20 ">
        {/* Not Started */}
        {notStartedTasks?.length > 0 && (
          <div className="col-span-1">
            <p className="text-lg capitalize text-watermelon-red pb-1 border-b border-b-watermelon-red">
              Not Started
            </p>
            {notStartedTasks.map((task) => (
              <div key={task?.taskId}>
                <CardComponent task={task} />
              </div>
            ))}
          </div>
        )}

        {/* In Progress */}
        {inProgressTasks?.length > 0 && (
          <div>
            <p className="text-lg capitalize text-royal-blue pb-1 border-b border-b-royal-blue">
              In Progress
            </p>
            {inProgressTasks.map((task) => (
              <div key={task?.taskId}>
                <CardComponent task={task} />
              </div>
            ))}
          </div>
        )}

        {/* Finished */}
        {finishedTasks?.length > 0 && (
          <div>
            <p className="text-lg capitalize text-persian-green pb-1 border-b border-b-persian-green">
              Finished
            </p>
            {finishedTasks.map((task) => (
              <div key={task?.taskId}>
                <CardComponent task={task} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Task Popup Button */}
      <div className="fixed bottom-10 right-10 flex gap-4 items-center">
        <AddNewTaskPopup />

        <div className="bg-white p-3 rounded-full">
          <img src="/4 dots.svg" alt="4 dots" />
        </div>
      </div>
    </div>
  );
}
