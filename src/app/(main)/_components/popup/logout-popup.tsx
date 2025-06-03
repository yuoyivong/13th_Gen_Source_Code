"use client";
import { logoutAction } from "@/actions/auth-action";
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
import { LogoutCurve } from "iconsax-react";
import React from "react";

export default function LogoutPopup() {
  // a function to handle log out
  const handleLogout = () => {
    logoutAction();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer border-0 hover:text-dark-blue bg-transparent shadow-none text-steel-gray text-base font-normal"
        >
          <LogoutCurve size="24" color="#94A3B8" variant="Broken" /> Log out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-dark-cyan">
            Are you sure you want to logout?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will restrict you from some actions and you will be
            treated as unauthencated users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            className="bg-dark-cyan hover:bg-dark-blue"
            onClick={handleLogout}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
