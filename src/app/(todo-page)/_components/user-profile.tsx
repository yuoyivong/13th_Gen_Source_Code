import { APIResponse } from "@/interface/api-response";
import { User } from "@/interface/user-type";
import { getCurrentUser } from "@/services/user-service";
import { Bell } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function UserProfile() {
  const currentUser = (await getCurrentUser()) as APIResponse<User>;
  return (
    <div className="flex gap-5 items-center">
      <Bell size={24} />

      <div className="flex gap-2">
        <Image
          src={
            "https://i.pinimg.com/736x/21/0c/25/210c25fe1410f01f9bd9602b069fc8f0.jpg"
          }
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
