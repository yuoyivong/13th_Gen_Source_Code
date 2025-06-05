import React from "react";
import UserInfo from "../_components/user-info";
import { getCurrentUser } from "@/services/user-service";
import { APIResponse } from "@/types/response/api-response";
import { UserInformation } from "@/types/model/user-information";

export default async function ProfilePage() {
  // get current user information
  const user = await getCurrentUser();
  return (
    <div className="container mx-auto">
      <UserInfo user={user?.payload} />
    </div>
  );
}
