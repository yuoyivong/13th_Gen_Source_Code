"use server";

import { signOut } from "@/auth";

const logoutAction = async () => {
  await signOut({ redirectTo: "/login" });
};

// expose methods
export { logoutAction };
