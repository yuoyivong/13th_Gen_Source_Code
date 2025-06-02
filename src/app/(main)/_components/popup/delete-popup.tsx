"use client";
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
import { Trash } from "iconsax-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function DeletePopup() {
  const pathname = usePathname();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {pathname === "/romantic-date" ? (
          <Button className="cursor-pointer bg-crimson-red/20 text-crimson-red hover:bg-crimson-red/30">
            <Trash size="14" color="#CB0404" variant="Broken" /> Delete
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
          <AlertDialogAction className="cursor-pointer bg-crimson-red hover:bg-red-800">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
