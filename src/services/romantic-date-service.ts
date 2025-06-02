import { BASE_URL } from "@/const/constant";

// get all romantic dates
const getAllRomanticDateList = async () => {
  const response = await fetch(`${BASE_URL}/romantic-date`);
  const romanticList = await response.json();
  return romanticList;
};

// expose method
export { getAllRomanticDateList };
