"use client";
import { updateTaskStatusAction } from "@/actions/task-action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "@/enum/status";
import { TaskType } from "@/interface/task-type";
import { WorkspaceType } from "@/interface/workspace-type";
import React, { useEffect, useState } from "react";

export default function SelectTaskStatus({
  taskId,
  workspaceId,
  status,
}: {
  taskId: TaskType["taskId"];
  workspaceId: WorkspaceType["workspaceId"];
  status: Status;
}) {
  // Initialize state for the selected status
  const [selectedStatus, setSelectedStatus] = useState(status);

  // Handle change when a new status is selected
  const handleSelectChange = async (newStatus: string) => {
    setSelectedStatus(newStatus as Status); // Type assertion ensures the selected value matches Status enum
    await updateTaskStatusAction(taskId, workspaceId, newStatus as Status);
  };

  return (
    <Select value={selectedStatus} onValueChange={handleSelectChange}>
      <SelectTrigger
        className={`w-36 truncate text-blue-600 ${
          status === Status.NOT_STARTED
            ? "border-watermelon-red text-watermelon-red "
            : status === Status.IN_PROGRESS
            ? "border-royal-blue text-royal-blue "
            : "border-persian-green text-persian-green "
        }`}
      >
        <SelectValue placeholder={status} className="" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="NOT_STARTED"
          disabled={status === Status.IN_PROGRESS || status === Status.FINISHED}
        >
          {Status.NOT_STARTED}
        </SelectItem>
        <SelectItem value="IN_PROGRESS" disabled={status === Status.FINISHED}>
          {Status.IN_PROGRESS}
        </SelectItem>
        <SelectItem value="FINISHED" disabled={status === Status.NOT_STARTED}>
          {Status.FINISHED}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
