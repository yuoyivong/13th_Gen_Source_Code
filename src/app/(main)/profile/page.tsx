import React from "react";
import UserInfo from "../_components/user-info";
import { getCurrentUser } from "@/services/user-service";

export default async function ProfilePage() {
  // get current user information
  const user = await getCurrentUser();
  return (
    <div className="container mx-auto">
      <UserInfo user={user?.payload} />
    </div>
  );
}
