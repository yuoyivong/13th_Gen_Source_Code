import { BASE_URL } from "@/const/constant";
import requestHeader from "@/lib/request-header";

// get current user
const getCurrentUser = async () => {
  const headers = await requestHeader();
  const response = await fetch(`${BASE_URL}/user`, {
    headers,
  });
  const user = await response.json();
  return user;
};

// expose method
export { getCurrentUser };
