"use client";
import {
  createNewTaskAction,
  getTaskByIdAction,
  updateTaskAction,
} from "@/actions/task-action";
import { getWorkspaceByIdAction } from "@/actions/workspace-action";
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
import { APIResponse } from "@/interface/api-response";
import { TaskType } from "@/interface/task-type";
import { WorkspaceType } from "@/interface/workspace-type";
import { cn } from "@/lib/utils";
import { taskSchema } from "@/schema/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AddSquare, Calendar2, Edit } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddUpdateTaskPopup({
  workspaceId,
  edit,
  taskId,
}: {
  workspaceId: WorkspaceType["workspaceId"];
  edit: boolean;
  taskId?: TaskType["taskId"];
}) {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<TaskType>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // New state for calendar

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
      taskDetails: "",
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
    if (!edit) {
      await createNewTaskAction(workspaceId, data);
    } else {
      if (taskId) await updateTaskAction(workspaceId, taskId, data);
    }
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
  const handleDialogToggle = (open: boolean) => {
    setIsOpen(open);
    if (!open) resetForm(); // Reset form when dialog closes
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from interfering
    setIsOpen(true); // Open dialog
  };

  // fetch workspace by id
  useEffect(() => {
    const fetchWorkspace = async () => {
      const taskById = (
        taskId ? await getTaskByIdAction(taskId, workspaceId) : null
      ) as APIResponse<TaskType>;
      if (taskById?.payload) {
        const fetchedTask = taskById.payload;
        setTask(fetchedTask);

        // Set form values when task data is available
        setValue("taskTitle", fetchedTask.taskTitle || "");
        setValue("tag", fetchedTask.tag || "");
        setValue("taskDetails", fetchedTask.taskDetails || "");

        if (fetchedTask.endDate) {
          const endDate = new Date(fetchedTask.endDate);
          setDate(endDate);
          setValue("endDate", endDate);
        }
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  useEffect(() => {
    console.log("task : ", task);
  }, [task]);
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogToggle}>
      <DialogTrigger asChild>
        {!edit ? (
          <Button className="cursor-pointer hover:bg-blue-700 hover:text-white bg-royal-blue rounded-3xl text-lg h-10 w-32 text-white">
            <AddSquare size="24" color="#ffffff" variant="Broken" /> New Task
          </Button>
        ) : (
          <button
            className="flex items-center gap-2"
            onClick={handleTriggerClick}
          >
            <Edit size="20" color="#4379F2" variant="Broken" />
            <span className="text-royal-blue text-base">Update</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px] bg-ghost-white">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {!edit ? "Create New Task" : "Update Task"}
            </DialogTitle>
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
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button" // Prevent form submission
                    variant={"outline"}
                    className={cn(
                      `${
                        errors?.endDate ? "border border-red-600" : ""
                      } w-full justify-start text-left font-normal`,
                      !date && "text-muted-foreground"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsCalendarOpen(true);
                    }}
                  >
                    <Calendar2 size="20" color="#94a3b8" variant="Broken" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                  onInteractOutside={(e) => {
                    e.preventDefault();
                    setIsCalendarOpen(false);
                  }}
                  onPointerDownOutside={(e) => {
                    e.preventDefault();
                    setIsCalendarOpen(false);
                  }}
                  style={{ zIndex: 9999 }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()} // Prevent clicks from closing
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                      disabled={false}
                    />
                  </div>
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
                {...register("taskDetails")}
                placeholder="Type your message here."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{!edit ? "Create" : "Save changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
