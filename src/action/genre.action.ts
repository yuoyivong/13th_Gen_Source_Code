"use server";
import {
  getAllCartoonGenres,
  getGenreNameById,
} from "@/services/cartoon-genre.service";

export const getAllGenres = async () => {
  const allGenres = await getAllCartoonGenres();
  return allGenres;
};

// get genre name by id
export const getGenreNameByGenreId = async (id: string) => {
  

  const genre = await getGenreNameById(id);
  

  return genre;
};
