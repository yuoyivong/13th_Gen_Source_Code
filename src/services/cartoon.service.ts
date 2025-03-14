// get all cartoon
export const getAllCartoon = async (genreId: string, search: string) => {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/cartoon?`;
  if (genreId) {
    url += `genre=${genreId}`;
  }

  if (search) {
    url += `search=${search}`;
  }

  const allCartoon = await fetch(url);
  const response = await allCartoon.json();
  return response;
};

// get cartoon by id
export const getCartoonById = async (id: number) => {
  const cartoon = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cartoon/${id}`
  );
  const response = await cartoon.json();
  return response;
};
