// get all book categories
export const getAllCartoonGenres = async () => {
  const genreList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cartoon_genre`
  );

  const response = await genreList.json();
  

  return response;
};

// get genre name by id from search params
export const getGenreNameById = async (genreId: string) => {
  const genre = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cartoon_genre/search?genre=${genreId}`
  );
  const response = await genre.json();
  return response;
};
