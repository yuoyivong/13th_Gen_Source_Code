"use server";
import { signIn } from "@/auth";
import { UserCredentails } from "@/types/auth/auth";

const loginAction = async (user: UserCredentails) => {
  console.log("User : ", user);

  await signIn("credentials", {
    email: user?.email,
    password: user?.password,
    redirectTo: "/",
  });
};

// expose methods
export { loginAction };
