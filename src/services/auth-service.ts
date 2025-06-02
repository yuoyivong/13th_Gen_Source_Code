import { BASE_URL } from "@/const/constant";
import { UserCredentails } from "@/types/auth/auth";

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

  return signedInUser;
};

// expose method
export { loginService };
