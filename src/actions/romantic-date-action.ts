"use server";

import { addNewRomanticDate } from "@/services/romantic-date-service";
import { RomanticDate } from "@/types/model/romantic-date";

// add new romantic date action
const addNewRomanticDateAction = async (item: RomanticDate) => {
  const dateItem = await addNewRomanticDate(item);
  return dateItem;
};

// expose method
export { addNewRomanticDateAction };
