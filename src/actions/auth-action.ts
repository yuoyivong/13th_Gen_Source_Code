"use server";
import { signIn, signOut } from "@/auth";
import { registerService } from "@/services/auth-service";
import { UserCredentails, UserRegistration } from "@/types/auth/auth";

// login action
const loginAction = async (user: UserCredentails) => {
  console.log("User : ", user);

  const result = await signIn("credentials", {
    email: user?.email,
    password: user?.password,
    redirect: false,
    callbackUrl: "/",
  });

  return result;
};

// register action
const registerAction = async (user: UserRegistration) => {
  // const newUser = {
  //   fullName: user?.fullName,
  //   email: user?.email,
  //   password: user?.password,
  // };

  const response = await registerService(user);
  return response;
};

// log out
const logoutAction = async () => {
  await signOut({ redirectTo: "/" });
};
// expose methods
export { loginAction, logoutAction, registerAction };
