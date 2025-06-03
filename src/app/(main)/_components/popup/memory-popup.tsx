"use client";
import { uploadFileAction } from "@/actions/upload-file-action";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlanStatus } from "@/enum/status";
import { cn } from "@/lib/utils";
import { romanticFormSchema } from "@/schema/romantic-form-schema";
import { RomanticDate } from "@/types/model/romantic-date";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Add,
  Calendar2,
  Edit,
  GalleryAdd,
  GalleryImport,
  Location,
  NoteText,
  Status,
  Trash,
} from "iconsax-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// create romantic date schema
const createRomanticDateSchema = romanticFormSchema.extend({
  status: z.nativeEnum(PlanStatus).optional(),
});

// update romantic date schema
const updateRomanticDateSchema = romanticFormSchema.extend({
  status: z.nativeEnum(PlanStatus, {
    required_error: "* Status cannot be empty.",
  }),
});

export default function MemoryPopup({ type }: { type: string }) {
  const [date, setDate] = useState<Date>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Track file name for UI
  const [isOpen, setIsOpen] = useState(false);

  // choose schema based one type
  const schema =
    type === "edit" ? updateRomanticDateSchema : createRomanticDateSchema;

  // validation with zod and react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    trigger,
  } = useForm<RomanticDate>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      location: "",
      date: undefined,
      details: "",
      status: undefined,
    },
  });

  // function for handling upload file image
  const handleUploadFile = async (file: File) => {
    const response = await uploadFileAction(file);
    console.log("Response file : ", response);
  };

  // get value from form submission
  const handleFormSubmit = (data: RomanticDate) => {
    console.log("Romantic date : ", data);
    handleUploadFile(data?.gallery);
    resetForm();
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) setValue("date", selectedDate, { shouldValidate: true });
  };

  // handle input file change
  const handleInputFileChange = () => {
    setValue("gallery", undefined as any);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  // manually reset form
  const resetForm = () => {
    reset();
    setDate(undefined);
  };

  // handle clear value when close popup
  const handleDialogToggle = (open: boolean) => {
    setIsOpen(open);
    if (!open) resetForm(); // Reset form when dialog closes
  };

  // get pathname
  const pathname = usePathname();

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogToggle}>
      <DialogTrigger asChild>
        {type === "create" ? (
          <Button
            variant="outline"
            className="bg-dark-cyan text-white hover:bg-dark-blue hover:text-white cursor-pointer"
          >
            <Add size="32" color="#FFFFFF" variant="Broken" /> New Memory
          </Button>
        ) : pathname === "/romantic-date" ? (
          <Button className="bg-dark-cyan/20 text-dark-cyan hover:bg-dark-cyan/30 cursor-pointer">
            <Edit size="14" color="#309898" variant="Broken" /> Edit
          </Button>
        ) : (
          <button className="cursor-pointer p-2 rounded-full inline-flex bg-white/90 drop-shadow-steel-gray-xs">
            <Edit size="24" color="#FF9F00" variant="Broken" />
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">
            {type === "create"
              ? "Create New Romantic Plan"
              : "Edit Romantic Plan"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Please fill in below fields to create a new memory
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid gap-6 pt-4"
        >
          {/* location */}
          <div className="space-y-1.5">
            <div className="flex gap-1.5">
              <Location size="20" color="#94A3B8" variant="Broken" />
              <Label
                htmlFor="location"
                className="text-right text-steel-gray text-md font-normal"
              >
                Location
              </Label>
            </div>

            <Input
              {...register("location")}
              type="text"
              placeholder="Please enter your date location"
              className={`${
                errors?.location
                  ? "focus:outline focus:outline-red-600 border border-red-600"
                  : "border-0"
              } bg-white-smoke placeholder:text-gray-300 py-5 px-4`}
            />

            {/* show error on location field */}
            {errors?.location && (
              <p className="text-red-600 text-sm mt-2">
                {errors?.location?.message}
              </p>
            )}
          </div>

          {/* date */}
          <div className="space-y-1.5">
            <div className="flex gap-1.5">
              <Calendar2 size="20" color="#94a3b8" variant="Broken" />
              <Label
                htmlFor="date"
                className="text-right text-steel-gray text-md font-normal"
              >
                Date
              </Label>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    `${
                      errors?.date
                        ? "focus:outline focus:outline-red-600 border border-red-600"
                        : "border-0"
                    } w-full bg-white-smoke py-5 px-4 justify-start text-left font-normal cursor-pointer",
                    !date && "text-muted-foreground`
                  )}
                >
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span className="text-gray-300">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              {errors?.date && (
                <p className="text-red-600 text-sm">{errors?.date?.message}</p>
              )}

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* status */}
          {type === "edit" && (
            <div className="space-y-1.5">
              <div className="flex gap-1.5">
                <Status size="20" color="#94a3b8" variant="Broken" />
                <Label
                  htmlFor="status"
                  className="text-right text-steel-gray text-md font-normal"
                >
                  Status
                </Label>
              </div>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Trigger validation to ensure the form state updates
                      trigger("status");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger
                      className={cn(
                        "bg-white-smoke data-[placeholder]:text-gray-300 w-full  py-5",
                        errors?.status &&
                          "bg-white-smoke focus:outline focus:outline-red-600 border border-red-600"
                      )}
                    >
                      <SelectValue placeholder="Please choose one of these status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ONGOING">
                        {PlanStatus.ongoing}
                      </SelectItem>
                      <SelectItem value="PENDING">
                        {PlanStatus.pending}
                      </SelectItem>
                      <SelectItem value="COMPLETED">
                        {PlanStatus.completed}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {/* show select error */}
              {errors?.status && (
                <p className="text-red-600 text-sm mt-2">
                  {errors?.status?.message}
                </p>
              )}
            </div>
          )}

          {/* details */}
          <div className="space-y-1.5">
            <div className="flex gap-1.5">
              <NoteText size="20" color="#94a3b8" variant="Broken" />
              <Label
                htmlFor="details"
                className="text-right text-steel-gray text-md font-normal"
              >
                Details
              </Label>
            </div>
            <Textarea
              {...register("details")}
              placeholder="Type some details"
              className={`${
                errors?.details
                  ? "focus:outline focus:outline-red-600 border border-red-600"
                  : "border-0"
              } bg-white-smoke placeholder:text-gray-300`}
            />

            {/* show details error message */}
            {errors?.details && (
              <p className="text-red-600 text-sm mt-2">
                {errors?.details?.message}
              </p>
            )}
          </div>

          {/* gallery */}
          <div className="space-y-1.5">
            <div className="flex gap-1.5">
              <GalleryAdd size="20" color="#94a3b8" variant="Broken" />
              <Label
                htmlFor="gallery"
                className="text-right text-steel-gray text-md font-normal"
              >
                Gallery
              </Label>
            </div>

            <Controller
              name="gallery"
              control={control}
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <div className="mt-1">
                  {!value ? (
                    <label
                      htmlFor="gallery-input"
                      className={`${
                        error?.message ? "border-red-600" : "border-gray-300"
                      } flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white-smoke hover:bg-gray-100`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <GalleryImport size="32" color="#94A3B8" />
                        <p className="my-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, JPEG (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="gallery-input"
                        type="file"
                        name="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                            if (previewUrl) {
                              URL.revokeObjectURL(previewUrl);
                            }
                            setPreviewUrl(URL.createObjectURL(file));
                          }
                        }}
                        ref={ref}
                      />
                    </label>
                  ) : (
                    <div className="relative border-2 border-gray-200 border-dashed bg-white-smoke rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        {previewUrl && (
                          <div className="flex-shrink-0">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Preview"
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {value.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(value.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleInputFileChange}
                          className="flex-shrink-0 hover:bg-red-100 cursor-pointer"
                        >
                          <Trash size="32" color="#CB0404" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {error && (
                    <p className="text-sm text-red-500 mt-2">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* create and edit button */}
          <DialogFooter>
            {type === "create" ? (
              <Button
                type="submit"
                className="bg-dark-cyan text-white hover:bg-dark-blue cursor-pointer"
              >
                Create
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-dark-blue text-white hover:bg-blue-950 cursor-pointer"
              >
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
