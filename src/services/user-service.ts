import { BASE_URL } from "@/const/constant";
import requestHeader from "@/lib/request-header";
import { UserInformation } from "@/types/model/user-information";
import { APIResponse } from "@/types/response/api-response";
import { revalidateTag } from "next/cache";

// get current user
const getCurrentUser = async () => {
  const headers = await requestHeader();
  const response = await fetch(`${BASE_URL}/user`, {
    headers,
    next: {
      tags: ["user"],
    },
  });
  const user = await response.json();
  return user as APIResponse<UserInformation>;
};

// update user info
const updateUserInfo = async (userInfo: UserInformation) => {
  const headers = await requestHeader();
  const response = await fetch(`${BASE_URL}/user`, {
    method: "PUT",
    headers,
    body: JSON.stringify(userInfo),
  });
  const data = (await response.json()) as APIResponse<UserInformation>;
  if (data?.status !== "OK") {
    throw new Error("Failed to update user information");
  }
  revalidateTag("user");
  return data;
};

// expose method
export { getCurrentUser, updateUserInfo };
