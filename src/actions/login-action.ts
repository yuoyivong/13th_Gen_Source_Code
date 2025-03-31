"use server";
import { signIn } from "@/auth";
import { User } from "@/interface/user-type";

const loginAction = async (user: User) => {
  console.log("user action", user);

  await signIn("credentials", {
    email: user.email,
    password: user.password,
    redirectTo: "/todo",
  });
};

// export method
export { loginAction };
