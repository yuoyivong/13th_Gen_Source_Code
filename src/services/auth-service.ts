import { User } from "@/interface/user-type";

// login service
const loginService = async (user: User) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const loginUser = await response.json();
  console.log("User login : ", loginUser);

  return loginUser;
};

// expose method
export { loginService };
