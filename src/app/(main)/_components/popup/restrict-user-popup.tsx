import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RestrictUserPopup() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">Romantic Dates</DialogTrigger>
      <DialogContent className="w-80 max-h-auto rounded-3xl pt-12">
        <DialogHeader className="flex items-center space-y-3">
          <Image
            src={"/images/security.svg"}
            width={190}
            height={190}
            alt="Restricted Image"
          />
          <DialogTitle className="text-center font-normal text-xl">
            You have no permission to do this action.
          </DialogTitle>
          {/* <AlertDialogDescription>
            To do this action, you need to log in first. This action is
            restricted for unauthenticated users.
          </AlertDialogDescription> */}
        </DialogHeader>
        <DialogFooter>
          <Link
            href={"/login"}
            className="w-full bg-dark-blue text-white flex items-center justify-center gap-5 py-2 rounded-md font-medium hover:bg-gray-800 cursor-pointer"
          >
            Please log in first{" "}
            <ArrowRight size="24" color="#FFFFFF" variant="Broken" />
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
