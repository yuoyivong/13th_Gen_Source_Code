"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { More } from "iconsax-react";
import { useState } from "react";
import AddUpdateTaskPopup from "./add-update-task";
import DeletePopup from "./delete";
import type { WorkspaceType } from "@/interface/workspace-type";
import { TaskType } from "@/interface/task-type";

export default function TaskOptionsDropdown({
  workspaceId,
  taskId,
}: {
  workspaceId: WorkspaceType["workspaceId"];
  taskId: TaskType["taskId"];
}) {
  const [open, setOpen] = useState(false);

  // Function to close dropdown when dialog opens
  const handleOpenDialog = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <More
          size="20"
          color="#94A3B8"
          variant="Broken"
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Option</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <AddUpdateTaskPopup workspaceId={workspaceId} edit={true} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DeletePopup workspaceId={workspaceId} taskId={taskId} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
