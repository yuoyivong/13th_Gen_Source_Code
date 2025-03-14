"use server";

import {
  getAllBookCategories,
  getCategoryNameById,
} from "@/services/category.service";

// get all category action
export const getAllBookCategory = async (category_id: string) => {
  const bookCategories = await getAllBookCategories(category_id);
  return bookCategories;
};

// get category name by id
export const getCategoryNameByCategoryId = async (id: string) => {
  

  const category = await getCategoryNameById(id);
  

  return category;
};
