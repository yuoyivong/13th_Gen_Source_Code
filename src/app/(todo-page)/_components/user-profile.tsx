import { APIResponse } from "@/interface/api-response";
import { User } from "@/interface/user-type";
import { getCurrentUser } from "@/services/user-service";
import { NotificationBing } from "iconsax-react";
import { Bell } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function UserProfile() {
  const currentUser = (await getCurrentUser()) as APIResponse<User>;
  return (
    <div className="flex gap-5 items-center">
      <NotificationBing size="28" color="#1E293B" variant="Broken" />

      <div className="flex gap-2">
        <Image
          src={currentUser?.payload?.profile}
          alt="user profile"
          width={45}
          height={45}
          className="rounded-full"
        />

        <div>
          <p className="capitalize">{currentUser?.payload?.username}</p>
          <p className="text-persian-green">{currentUser?.payload?.email}</p>
        </div>
      </div>
    </div>
  );
}
