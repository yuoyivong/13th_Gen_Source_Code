"use client";
import { Trash, Warning2 } from "iconsax-react";
import React, { FormEvent } from "react";
import { WorkspaceType } from "@/interface/workspace-type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TaskType } from "@/interface/task-type";
import { deleteTaskAction } from "@/actions/task-action";

export default function DeletePopup({
  workspaceId,
  taskId,
}: {
  workspaceId: WorkspaceType["workspaceId"];
  taskId: TaskType["taskId"];
}) {
  const handleDeleteTask = async (e: FormEvent) => {
    e.preventDefault();
    console.log("TAsk id : ", taskId);
    console.log("workspace id : ", workspaceId);
    await deleteTaskAction(workspaceId, taskId);
  };
  //
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="flex gap-2 items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash size="32" color="#F96666" variant="Broken" />
          <span className="text-watermelon-red text-base">Delete</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-ghost-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-watermelon-red flex gap-2">
            <Warning2 size="28" color="#F96666" variant="Broken" /> Are you
            absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            * This action cannot be undone. This will permanently delete your
            task from this workspace.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={handleDeleteTask}>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
