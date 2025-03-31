import { auth } from "@/auth";

const getRequestHeader = async () => {
  const session = await auth();
  console.log("Session : ", session);

  return {
    Authorization: `Bearer ${session?.user?.token}`,
    "Content-Type": "application/json",
  };
};

// expose method
export default getRequestHeader;
