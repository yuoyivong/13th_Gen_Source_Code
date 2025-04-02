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

// register service
const registerService = async (user: User) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const newUser = await response.json();
  return newUser;
};

// expose method
export { loginService, registerService };
