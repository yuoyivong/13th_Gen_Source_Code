"use client";
import { createNewTaskAction } from "@/actions/task-action";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tag } from "@/enum/tag";
import { WorkspaceType } from "@/interface/workspace-type";
import { cn } from "@/lib/utils";
import { taskSchema } from "@/schema/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AddSquare, Calendar2 } from "iconsax-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddUpdateTaskPopup({
  workspaceId,
}: {
  workspaceId: WorkspaceType["workspaceId"];
}) {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskTitle: "",
      tag: "",
      endDate: undefined,
      details: "",
    },
  });

  // Function to reset the form and clear errors
  const resetForm = () => {
    reset(); // Reset form values
    setValue("tag", ""); // Manually clear the tag field
    setDate(undefined); // Reset the date state
  };

  // handle form submit
  const handleFormSubmit = async (data: any) => {
    console.log(data);
    await createNewTaskAction(workspaceId, data);
    resetForm(); // Call the function to reset everything
    setIsOpen(false);
  };

  // ✅ Use watch() to get the current value
  const tagValue = watch("tag");

  // Update endDate when a date is selected
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setValue("endDate", selectedDate, { shouldValidate: true });
  };

  // handle clear value when close popup
  const handleOpenDialog = () => {
    setIsOpen(!isOpen);
    if (!isOpen) resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:bg-blue-700 hover:text-white bg-royal-blue rounded-3xl text-lg h-10 w-32 text-white">
          <AddSquare size="24" color="#ffffff" variant="Broken" /> New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px] bg-ghost-white">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* task title */}
            <div>
              <Label htmlFor="taskTitle" className="mb-2">
                Title
              </Label>
              <Input
                {...register("taskTitle")}
                id="taskTitle"
                placeholder="Please type your task title"
                className={`${
                  errors?.taskTitle ? "border border-red-600" : ""
                }`}
              />

              {errors?.taskTitle && (
                <p className="text-red-600 text-sm mt-2">
                  {errors?.taskTitle?.message}
                </p>
              )}
            </div>

            {/* task tags */}
            <div>
              <Label htmlFor="tag" className="mb-2">
                Tag
              </Label>
              <Select
                value={tagValue}
                onValueChange={(value) =>
                  setValue("tag", value, { shouldValidate: true })
                }
              >
                <SelectTrigger
                  className={`${
                    errors?.tag ? "border border-red-600" : ""
                  } col-span-3 w-full`}
                >
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ASSIGNMENT">{Tag.ASSIGNMENT}</SelectItem>
                    <SelectItem value="DATABASE">{Tag.DATABASE}</SelectItem>
                    <SelectItem value="DEPLOYMENT">{Tag.DEPLOYMENT}</SelectItem>
                    <SelectItem value="DESIGN">{Tag.DESIGN}</SelectItem>
                    <SelectItem value="DOCUMENTATION">
                      {Tag.DOCUMENTATION}
                    </SelectItem>
                    <SelectItem value="FEATURE">{Tag.FEATURE}</SelectItem>
                    <SelectItem value="GIT">{Tag.GIT}</SelectItem>
                    <SelectItem value="HOMEWORK">{Tag.HOMEWORK}</SelectItem>
                    <SelectItem value="MINI_PROJECT">
                      {Tag.MINI_PROJECT}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Hidden input to make react-hook-form track the field */}
              <input type="hidden" {...register("tag")} />

              {errors?.tag && (
                <p className="text-red-600 text-sm mt-2">
                  {errors?.tag?.message}
                </p>
              )}
            </div>

            {/* end date */}
            <div>
              <Label htmlFor="endDate" className="mb-2">
                End Date
              </Label>
              <Popover {...register("endDate")}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      `${
                        errors?.endDate ? "border border-red-600" : ""
                      } w-full col-span-3 justify-start text-left font-normal z-50 `,
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar2 size="20" color="#94a3b8" variant="Broken" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange} // Update the date in form
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {errors?.endDate && (
                <p className="text-red-600 text-sm mt-2">
                  {errors?.endDate?.message}
                </p>
              )}
            </div>

            {/* task details */}
            <div>
              <Label htmlFor="taskDetails" className="mb-2">
                Details
              </Label>
              <Textarea
                {...register("details")}
                placeholder="Type your message here."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
