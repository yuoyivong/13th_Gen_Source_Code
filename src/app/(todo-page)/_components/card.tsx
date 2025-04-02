import { Status } from "@/enum/status";
import { TaskType } from "@/interface/task-type";
import formattedDate from "@/lib/format-date";
import React from "react";
import SelectTaskStatus from "./select-task-status";
import { WorkspaceType } from "@/interface/workspace-type";
import { Clock, More } from "iconsax-react";
import DeletePopup from "./delete";
import AddUpdateTaskPopup from "./add-update-task";
import TaskOptionsDropdown from "./task-options-dropdown";

export default function CardComponent({
  task,
  workspaceId,
}: {
  task: TaskType;
  workspaceId: WorkspaceType["workspaceId"];
}) {
  return (
    <div className="border border-gray-300 rounded-xl mt-8">
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold capitalize">{task?.taskTitle}</h2>
          {/* <UpdateDeleteDropdown workspaceId={workspaceId} /> */}
          <TaskOptionsDropdown
            workspaceId={workspaceId}
            taskId={task?.taskId}
          />
        </div>

        {/* task detials */}
        <p className="line-clamp-2 text-light-steel-blue my-2 h-12">
          {task?.taskDetails}
        </p>

        <div className="flex justify-between items-center mt-4">
          {/* tag */}
          <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">
            {task?.tag}
          </p>

          {/* status */}
          <div
            className={`rounded-full w-8 h-8 ${
              task?.status === Status.NOT_STARTED
                ? "bg-watermelon-red"
                : task?.status === Status.IN_PROGRESS
                ? "bg-royal-blue"
                : "bg-persian-green"
            }`}
          ></div>
        </div>
      </div>

      {/* progress */}
      <div className="flex justify-between items-center border-t border-t-gray-300 p-5">
        <SelectTaskStatus
          status={task?.status}
          workspaceId={workspaceId}
          taskId={task?.taskId}
        />

        {/* date */}
        <p className="flex gap-2 text-light-steel-blue">
          <Clock size="22" color="#94A3B8" variant="Broken" />{" "}
          {formattedDate(task?.endDate || new Date())}
        </p>
      </div>
    </div>
  );
}
