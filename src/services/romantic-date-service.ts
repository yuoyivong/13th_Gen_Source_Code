import { BASE_URL } from "@/const/constant";
import requestHeader from "@/lib/request-header";
import { RomanticDate } from "@/types/model/romantic-date";
import { APIResponse } from "@/types/response/api-response";

// get all romantic dates
const getAllRomanticDateList = async () => {
  const headers = await requestHeader();
  const response = await fetch(
    `${BASE_URL}/romantic-date?pageNo=0&pageSize=10&sortBy=id&sortDirection=ASC`,
    {
      headers,
      next: { tags: ["romantic-dates"] },
    }
  );
  console.log("Romantic list from service: ", response);
  const romanticList = await response.json();

  return romanticList as APIResponse<RomanticDate[]>;
};

// get romantic date by id
const getRomanticDateById = async (id: RomanticDate["id"]) => {
  const headers = await requestHeader();
  const response = await fetch(`${BASE_URL}/romantic-date/${id}`, {
    headers,
  });
  const romanticDate = await response.json();
  return romanticDate as APIResponse<RomanticDate>;
};

// create new romantic date
const addNewRomanticDate = async (item: RomanticDate) => {
  const headers = await requestHeader();
  const response = await fetch(`${BASE_URL}/romantic-date`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  });
  const newRomanticDate = await response.json();
  return newRomanticDate as APIResponse<RomanticDate>;
};

// update romantic date
const updateRomanticDateById = async (
  id: RomanticDate["id"],
  item: RomanticDate
) => {
  const headers = await requestHeader();
  const response = await fetch(`${BASE_URL}/romantic-date/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(item),
  });
  const updatedRomanticDate = await response.json();
  return updatedRomanticDate as APIResponse<RomanticDate>;
};

// delete romantic date
const deleteRomanticDateById = async (ids: RomanticDate["id"][]) => {
  const headers = await requestHeader();

  // ids is always an array
  const idsArray = Array.isArray(ids) ? ids : [ids];

  // filter out undefined ids and convert all ids to integers
  const integerIds = idsArray
    .filter((id): id is NonNullable<typeof id> => id !== undefined)
    .map((id) => parseInt(id.toString()));

  const response = await fetch(`${BASE_URL}/romantic-date`, {
    method: "DELETE",
    headers,
    body: JSON.stringify(integerIds),
  });
  const res = await response.json();

  return res as APIResponse<{ message: string; status: string }>;
};

// expose method
export {
  getAllRomanticDateList,
  getRomanticDateById,
  addNewRomanticDate,
  updateRomanticDateById,
  deleteRomanticDateById,
};
