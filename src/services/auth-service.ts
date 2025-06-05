import { BASE_URL } from "@/const/constant";
import { UserCredentails, UserRegistration } from "@/types/auth/auth";
import { APIResponse } from "@/types/response/api-response";

// login service
const loginService = async (user: UserCredentails) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const signedInUser = await response.json();
  console.log("Token : ", signedInUser);

  return signedInUser as APIResponse<UserCredentails>;
};

// register service
const registerService = async (user: UserRegistration) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const registeredUser = await response.json();
  console.log("Registered User : ", registeredUser);

  return registeredUser as APIResponse<UserRegistration>;
};

// expose method
export { loginService, registerService };
