"use server";
import { signIn } from "@/auth";
import { User } from "@/interface/user-type";
import { registerService } from "@/services/auth-service";
import { redirect } from "next/navigation";

const loginAction = async (user: User) => {
  await signIn("credentials", {
    email: user.email,
    password: user.password,
    redirectTo: "/todo",
  });
};

// register action
const registerAction = async (user: User) => {
  await registerService(user);
  redirect("/login");
};

// export method
export { loginAction, registerAction };
