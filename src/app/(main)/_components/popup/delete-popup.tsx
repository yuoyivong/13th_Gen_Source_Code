"use client";
import { deleteRomanticDateAction } from "@/actions/romantic-date-action";
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
import { Button } from "@/components/ui/button";
import { RomanticDate } from "@/types/model/romantic-date";
import { Trash } from "iconsax-react";
import { LoaderIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteRomanticDateProps {
  ids: RomanticDate["id"][];
  label?: string;
  onDeleted?: () => void;
}

export default function DeletePopup({
  ids,
  label,
  onDeleted,
}: DeleteRomanticDateProps) {
  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();

  const handleDeleteRomanticDate = async () => {
    setLoading(true);

    try {
      const response = await deleteRomanticDateAction(ids);
      if (response?.status === "OK") {
        if (onDeleted) onDeleted();
        toast.success(response?.message || "Deleted Successfully.");
      } else {
        toast.error("Failed to delete.");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {pathname === "/romantic-date" ? (
          <Button className="cursor-pointer bg-crimson-red/20 text-crimson-red hover:bg-crimson-red/30">
            <Trash size="14" color="#CB0404" variant="Broken" /> Delete {label}
          </Button>
        ) : (
          <button className="cursor-pointer p-2 rounded-full inline-flex bg-white/90 drop-shadow-steel-gray-xs">
            <Trash size="24" color="#CB0404" variant="Broken" />
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete this?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            memory and remove your data from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-crimson-red hover:bg-red-800"
            onClick={handleDeleteRomanticDate}
          >
            {loading ? (
              <p className="flex items-center gap-2">
                <LoaderIcon />
                <span>Deleting ...</span>
              </p>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
