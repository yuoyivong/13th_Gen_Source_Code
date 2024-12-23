const { headerToken } = require("@/libs/headerToken");

// get all genres
const getAllGenres = async () => {
  const headerReq = await headerToken();
  const genres = await fetch(`${process.env.AUTH_BASE_URL}/genres`, {
    headers: headerReq,
  });

  const res = await genres.json();
  return res;
};

// get genre by id
const getGenreByGenreId = async (genreId) => {
  const headerReq = await headerToken();
  const genre = await fetch(`${process.env.AUTH_BASE_URL}/genre/${genreId}`, {
    headers: headerReq,
  });

  const res = await genre.json();
  return res;
};

// insert new genre
const insertNewGenre = async (data) => {
  const headerReq = await headerToken();
  const genre = await fetch(`${process.env.AUTH_BASE_URL}/genre`, {
    method: "POST",
    headers: headerReq,
    body: JSON.stringify(data),
  });
  const res = await genre.json();
  return res;
};

// expose each method to be publicly accessible within the application
export { getAllGenres, getGenreByGenreId, insertNewGenre };
