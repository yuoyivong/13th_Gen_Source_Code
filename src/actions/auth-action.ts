"use server";
import { signIn, signOut } from "@/auth";
import { UserCredentails } from "@/types/auth/auth";

// login
const loginAction = async (user: UserCredentails) => {
  console.log("User : ", user);

  await signIn("credentials", {
    email: user?.email,
    password: user?.password,
    redirectTo: "/",
  });
};

// log out
const logoutAction = async () => {
  await signOut({ redirectTo: "/" });
};
// expose methods
export { loginAction, logoutAction };
