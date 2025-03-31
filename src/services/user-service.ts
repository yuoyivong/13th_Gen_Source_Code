import getRequestHeader from "@/lib/request-header";

const getCurrentUser = async () => {
  const headers = await getRequestHeader();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/user`,
    {
      headers,
    }
  );
  const user = await response.json();
  return user;
};

// expose method
export { getCurrentUser };
