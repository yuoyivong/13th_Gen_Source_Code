import { BASE_URL } from "@/const/constant";
import requestHeader from "@/lib/request-header";
import { RomanticDate } from "@/types/model/romantic-date";

// get all romantic dates
const getAllRomanticDateList = async () => {
  const response = await fetch(`${BASE_URL}/romantic-date`, {
    next: { tags: ["romantic-dates"] },
  });
  const romanticList = await response.json();
  return romanticList;
};

// get romantic date by id
const getRomanticDateById = async (id: RomanticDate["id"]) => {
  const response = await fetch(`${BASE_URL}/romantic-date/${id}`);
  const romanticDate = await response.json();
  return romanticDate;
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
  return newRomanticDate;
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
  return updatedRomanticDate;
};

// delete romantic date
const deleteRomanticDateById = async (ids: RomanticDate["id"]) => {
  const headers = await requestHeader();

  // ids is always an array
  const idsArray = Array.isArray(ids) ? ids : [ids];

  // convert all ids to integers
  const integerIds = idsArray.map((id) => parseInt(id.toString()));

  const response = await fetch(`${BASE_URL}/romantic-date`, {
    method: "DELETE",
    headers,
    body: JSON.stringify(integerIds),
  });
  const res = await response.json();
  console.log("REs : ", res);

  return res;
};

// expose method
export {
  getAllRomanticDateList,
  getRomanticDateById,
  addNewRomanticDate,
  updateRomanticDateById,
  deleteRomanticDateById,
};
