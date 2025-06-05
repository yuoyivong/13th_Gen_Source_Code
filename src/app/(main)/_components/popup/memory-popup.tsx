"use client";
import {
  addNewRomanticDateAction,
  getRomanticDateAction,
  updatedRomanticDateAction,
} from "@/actions/romantic-date-action";
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
import { handleUploadFile } from "@/lib/upload-file-lib";
import { cn } from "@/lib/utils";
import { romanticFormSchema } from "@/schema/romantic-form-schema";
import type { RomanticDate } from "@/types/model/romantic-date";
import type { APIResponse } from "@/types/response/api-response";
import type { FileMetadata } from "@/types/response/file-response";
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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Create schemas that handle both File and optional gallery for edit mode
const createRomanticDateSchema = romanticFormSchema.extend({
  status: z.nativeEnum(PlanStatus).optional(),
});

// For edit mode, make gallery optional and handle status properly
const updateRomanticDateSchema = romanticFormSchema
  .extend({
    status: z.nativeEnum(PlanStatus, {
      required_error: "* Status cannot be empty.",
    }),
  })
  .merge(
    z.object({
      gallery: z
        .custom<File>((val) => val instanceof File, {
          message: "* Gallery cannot be empty.",
        })
        .optional(),
    })
  );

// Form data type
type FormData =
  | z.infer<typeof createRomanticDateSchema>
  | z.infer<typeof updateRomanticDateSchema>;

export default function MemoryPopup({
  type,
  id,
}: {
  type: "create" | "edit";
  id?: RomanticDate["id"];
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // choose schema based on type
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
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      location: "",
      date: undefined,
      details: "",
      status: undefined, // Keep as undefined, not empty string
    },
  });

  // get value from form submission
  const handleFormSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      console.log("Form data before processing:", data);

      let galleryUrl = existingImageUrl;

      // Only upload new file if a new file was selected
      if (data?.gallery instanceof File) {
        const fileMetadata = (await handleUploadFile(
          data.gallery
        )) as APIResponse<FileMetadata>;

        if (!fileMetadata?.payload?.fileUrl) {
          throw new Error("File upload failed");
        }

        galleryUrl = fileMetadata.payload.fileUrl;
      }

      // For edit mode, ensure we have a gallery URL
      if (type === "edit" && !galleryUrl) {
        throw new Error("Gallery image is required");
      }

      // Clean the data before submission
      const submissionData: any = {
        location: data.location,
        date: data.date,
        details: data.details,
        gallery: galleryUrl,
      };

      // Only include status if it's defined and not empty
      if (data?.status && data?.status !== undefined) {
        submissionData.status = data.status;
      }

      console.log("Submission data:", submissionData);

      // call romantic date service
      let response: APIResponse<RomanticDate> | undefined;
      if (type === "create") {
        response = await addNewRomanticDateAction(submissionData);
      } else if (type === "edit") {
        response = await updatedRomanticDateAction(id!, submissionData);
      }

      if (
        response &&
        (response.status === "CREATED" || response.status === "OK")
      ) {
        setIsOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle input file change
  const handleInputFileChange = () => {
    setValue("gallery", undefined as any);
    clearErrors("gallery");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setExistingImageUrl(null);
  };

  // manually reset form
  const resetForm = () => {
    reset({
      location: "",
      date: undefined,
      details: "",
      status: undefined, // Reset to undefined, not empty string
    });

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setExistingImageUrl(null);
  };

  // fetch romantic date data for editing
  const fetchRomanticCardById = async (romanticId: RomanticDate["id"]) => {
    try {
      setIsLoading(true);
      const response = (await getRomanticDateAction(
        romanticId
      )) as APIResponse<RomanticDate>;

      if (response?.status === "OK" && response?.payload) {
        const data = response.payload;

        // Reset form with fetched data
        reset({
          location: data.location || "",
          date: data.date ? new Date(data.date) : undefined,
          details: data.details || "",
          status: data.status || undefined, // Ensure it's undefined if no status
          gallery: undefined,
        });

        // Set existing image URL and clear any gallery errors
        if (data.gallery) {
          if (typeof data.gallery === "string") {
            setExistingImageUrl(data.gallery);
          } else {
            setExistingImageUrl(null);
          }
          clearErrors("gallery");
        }

        console.log("Fetched data:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle dialog opens or closes
  const handleDialogToggle = (open: boolean) => {
    setIsOpen(open);

    if (open && type === "edit" && id) {
      fetchRomanticCardById(id);
    } else if (!open) {
      resetForm();
    }
  };

  // get pathname
  const pathname = usePathname();

  // Custom validation for gallery field in edit mode
  const validateGallery = (value: File | undefined) => {
    if (type === "create") {
      return value instanceof File || "Gallery image is required";
    }
    return (
      value instanceof File || existingImageUrl || "Gallery image is required"
    );
  };

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
            Please fill in below fields to{" "}
            {type === "create" ? "create a new" : "edit this"} memory
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

            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        `${
                          errors?.date
                            ? "focus:outline focus:outline-red-600 border border-red-600"
                            : "border-0"
                        } w-full bg-white-smoke py-5 px-4 justify-start text-left font-normal cursor-pointer`,
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="text-gray-300">Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        trigger("date");
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            {errors?.date && (
              <p className="text-red-600 text-sm">{errors?.date?.message}</p>
            )}
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
                      // Ensure we're setting a valid enum value or undefined
                      const validValue =
                        value && value !== "" ? value : undefined;
                      field.onChange(validValue);
                      trigger("status");
                    }}
                    value={field.value || ""} // Convert undefined to empty string for Select component
                  >
                    <SelectTrigger
                      className={cn(
                        "bg-white-smoke data-[placeholder]:text-gray-300 w-full border-0 py-5",
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
              } bg-white-smoke placeholder:text-gray-300 overflow-hidden max-h-32 resize-y break-all whitespace-pre-wrap`}
            />

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
              rules={{
                validate: validateGallery,
              }}
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <div className="mt-1">
                  {!value && !existingImageUrl ? (
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
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                            clearErrors("gallery");
                            if (previewUrl) {
                              URL.revokeObjectURL(previewUrl);
                            }
                            setPreviewUrl(URL.createObjectURL(file));
                            setExistingImageUrl(null);
                          }
                        }}
                        ref={ref}
                      />
                    </label>
                  ) : (
                    <div className="relative border-2 border-gray-200 border-dashed bg-white-smoke rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={
                              previewUrl ||
                              existingImageUrl ||
                              "/placeholder.svg"
                            }
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {value ? value.name : ""}
                          </p>
                          <p className="text-sm text-gray-500">
                            {value
                              ? `${(value.size / 1024 / 1024).toFixed(2)} MB`
                              : ""}
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

          <DialogFooter>
            {type === "create" ? (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-dark-cyan text-white hover:bg-dark-blue cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-dark-blue text-white hover:bg-blue-950 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
