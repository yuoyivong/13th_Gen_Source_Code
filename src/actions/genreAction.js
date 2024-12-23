const { insertNewGenre } = require("@/service/genreService");

// create new genre
const createNewGenre = async (genre) => {
  const newGenre = await insertNewGenre(genre);
  return newGenre;
};

// expose method
export { createNewGenre };
