import { auth } from "@/auth";

const requestHeader = async () => {
  const session = await auth();

  return {
    Authorization: `Bearer ${session?.user?.token}`,
    "Content-Type": "application/json",
  };
};

// expose method
export default requestHeader;
