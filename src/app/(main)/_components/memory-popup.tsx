"use client";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Add,
  Calendar2,
  Edit,
  GalleryAdd,
  Location,
  NoteText,
  Status,
} from "iconsax-react";
import React, { useState } from "react";

export default function MemoryPopup({ type }: { type: string }) {
  const [date, setDate] = useState<Date>();
  return (
    <Dialog>
      <DialogTrigger asChild>
        {type === "create" ? (
          <Button
            variant="outline"
            className="bg-dark-cyan text-white hover:bg-dark-blue hover:text-white cursor-pointer"
          >
            <Add size="32" color="#FFFFFF" variant="Broken" /> New Memory
          </Button>
        ) : (
          <div className="cursor-pointer p-2 rounded-full inline-flex bg-white/90 drop-shadow-steel-gray-xs">
            <Edit size="24" color="#FF9F00" variant="Broken" />
          </div>
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

        <div className="grid gap-6 py-4">
          {/* location */}
          <div className="space-y-3">
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
              id="location"
              type="text"
              placeholder="Please put location"
              className="bg-white-smoke border-none placeholder:text-gray-300 py-5 px-4"
            />
          </div>

          {/* date */}
          <div className="space-y-3">
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
                    "w-full border-none bg-white-smoke py-5 px-4 justify-start text-left font-normal cursor-pointer",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span className="text-gray-300">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* gallery */}
          <div className="space-y-3">
            <div className="flex gap-1.5">
              <GalleryAdd size="20" color="#94a3b8" variant="Broken" />
              <Label
                htmlFor="gallery"
                className="text-right text-steel-gray text-md font-normal"
              >
                Gallery
              </Label>
            </div>
            <Input
              id="gallery"
              type="file"
              className="bg-white-smoke border-none cursor-pointer"
            />
          </div>

          {/* status */}
          {type === "edit" && (
            <div className="space-y-3">
              <div className="flex gap-1.5">
                <Status size="20" color="#94a3b8" variant="Broken" />
                <Label
                  htmlFor="status"
                  className="text-right text-steel-gray text-md font-normal"
                >
                  Status
                </Label>
              </div>

              <Select>
                <SelectTrigger className="w-full border-none bg-white-smoke py-5">
                  <SelectValue
                    placeholder="Please choose one of these status
                  "
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONGOING">ONGOING</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* details */}
          <div className="space-y-3">
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
              placeholder="Type some details"
              className="border-none bg-white-smoke placeholder:text-gray-300"
            />
          </div>
        </div>
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
      </DialogContent>
    </Dialog>
  );
}
