"use server";

import { updateUserInfo } from "@/services/user-service";
import { UserInformation } from "@/types/model/user-information";

// update current user info
const updateUserInfoAction = async (user: UserInformation) => {
  const response = await updateUserInfo(user);
  if (response?.status !== "OK") {
    throw new Error("Failed to update user information");
  }
  return response;
};

// expose method
export { updateUserInfoAction };
