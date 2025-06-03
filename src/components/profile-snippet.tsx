import { DEFAULT_IMAGE_URL } from "@/const/constant";
import { getCurrentUser } from "@/services/user-service";
import { UserInformation } from "@/types/model/user-information";
import { APIResponse } from "@/types/response/api-response";
import Image from "next/image";
import React from "react";

export default async function ProfileSnippet() {
  const user = (await getCurrentUser()) as APIResponse<UserInformation>;

  return (
    <>
      <div className="flex gap-5 items-center bg-white-smoke py-2.5 px-4 rounded-xl hover:bg-gray-100 transition-all">
        <div className="relative w-13 h-13">
          <Image
            src={user?.payload?.profileUrl || DEFAULT_IMAGE_URL}
            alt={user?.payload?.fullName}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="text-base">
          <p className="capitalize text-dark-cyan font-medium">
            {user?.payload?.fullName}
          </p>
          <p className="text-dark-blue font-normal truncate w-70">
            {user?.payload?.bio || user?.payload?.email}
          </p>
        </div>
      </div>
    </>
  );
}
