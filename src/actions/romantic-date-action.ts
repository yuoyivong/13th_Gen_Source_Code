"use server";

import {
  addNewRomanticDate,
  deleteRomanticDateById,
  getRomanticDateById,
  updateRomanticDateById,
} from "@/services/romantic-date-service";
import { RomanticDate } from "@/types/model/romantic-date";
import { revalidateTag } from "next/cache";

// get romantic card by id
const getRomanticDateAction = async (id: RomanticDate["id"]) => {
  const response = await getRomanticDateById(id);
  return response;
};
// add new romantic date action
const addNewRomanticDateAction = async (item: RomanticDate) => {
  const dateItem = await addNewRomanticDate(item);
  revalidateTag("romantic-dates");
  return dateItem;
};

// delete romantic date
const deleteRomanticDateAction = async (ids: RomanticDate["id"][]) => {
  const response = await deleteRomanticDateById(ids);
  console.log("Delete response : ", response);

  revalidateTag("romantic-date");
  return response;
};

// update romantic date
const updatedRomanticDateAction = async (
  id: RomanticDate["id"],
  item: RomanticDate
) => {
  const response = await updateRomanticDateById(id, item);
  revalidateTag("romantic-date");
  return response;
};

// expose method
export {
  addNewRomanticDateAction,
  deleteRomanticDateAction,
  updatedRomanticDateAction,
  getRomanticDateAction,
};
