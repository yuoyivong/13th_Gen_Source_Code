"use client";
import {
  createWorkspaceAction,
  getWorkspaceByIdAction,
  updateWorkspaceAction,
} from "@/actions/workspace-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { APIResponse } from "@/interface/api-response";
import { WorkspaceType } from "@/interface/workspace-type";
import { AddSquare, More } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddUpdateWorkspacePopup({
  edit,
  workspaceId,
}: {
  edit: boolean;
  workspaceId?: WorkspaceType["workspaceId"];
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ workspaceName: string }>();

  const [isOpen, setIsOpen] = useState(false);

  // workspace id state
  const [wId, setWId] = useState<WorkspaceType["workspaceId"]>();
  const [wName, setWName] = useState<WorkspaceType["workspaceName"]>("");

  const handleFormSubmit = async (data: { workspaceName: string }) => {
    if (!edit) {
      await createWorkspaceAction(data.workspaceName);
    } else {
      if (wId) {
        await updateWorkspaceAction(wId, data.workspaceName);
      } else {
        console.error("Workspace ID is undefined.");
      }
    }

    reset();
  };

  // Handle dialog state change (open/close) and form reset
  const handleDialogStateChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset(); // Reset the form when modal closes
    }
  };

  // get workspace by id
  const getById = async (id: WorkspaceType["workspaceId"]) => {
    const workspace = (await getWorkspaceByIdAction(
      id
    )) as APIResponse<WorkspaceType>;
    setWName(workspace?.payload?.workspaceName);
  };

  useEffect(() => {
    console.log(wId);
    if (wId) {
      getById(wId);
    }
  }, [wId]);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogStateChange}>
      <DialogTrigger asChild>
        {!edit ? (
          <AddSquare
            size="24"
            color="#94a3b8"
            variant="Broken"
            className="cursor-pointer"
          />
        ) : (
          <More
            size="20"
            color="#1E293B"
            variant="Broken"
            className="cursor-pointer"
            onClick={() => setWId(workspaceId)}
          />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-ghost-white">
        <DialogHeader>
          <DialogTitle>
            {!edit ? "Create New Workspace" : "Update Workspace"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            {/* Error message conditionally rendered */}
            {errors?.workspaceName && (
              <p className="text-red-600 text-sm mb-1">
                {errors.workspaceName.message}
              </p>
            )}
            <Input
              {...register("workspaceName", {
                required: "* Workspace name cannot be empty.",
              })}
              defaultValue={wName}
              type="text"
              id="workspaceName"
              placeholder="Please type your workspace name"
              className={`${
                errors?.workspaceName
                  ? "border border-red-600 focus:outline focus:outline-red-600"
                  : ""
              } col-span-3`}
            />
            <DialogDescription className="mt-1 text-persian-green">
              Please add the workspace name in the above input.
            </DialogDescription>
          </div>
          <DialogFooter>
            <Button type="submit">{!edit ? "Create" : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
