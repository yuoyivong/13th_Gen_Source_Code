"use client";
import { createWorkspaceAction } from "@/actions/workspace-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WorkspaceType } from "@/interface/workspace-type";
import { SquarePlus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function AddNewWorkspace() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ workspaceName: string }>();

  const handleFormSubmit = async (data: { workspaceName: string }) => {
    console.log(data);
    await createWorkspaceAction(data.workspaceName);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePlus size={20} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-right mb-2">
              Workspace Name
            </Label>
            <Input
              {...register("workspaceName", {
                required: "* Workspace name cannot be empty.",
              })}
              type="text"
              id="workspaceName"
              placeholder="Please type your workspace name"
              className={`${
                errors?.workspaceName
                  ? "border border-red-600 focus:outline focus:outline-red-600"
                  : ""
              } col-span-3`}
            />

            {/* Error message conditionally rendered */}
            {errors?.workspaceName && (
              <p className="text-red-600 text-sm mt-2">
                {errors.workspaceName.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
