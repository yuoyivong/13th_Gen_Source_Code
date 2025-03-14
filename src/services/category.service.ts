// get all book categories
export const getAllBookCategories = async (category_id: string) => {
  const categoryList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/book_category?query=${category_id}`
  );

  const response = await categoryList.json();
  

  return response;
};

// get category name by id from search params
export const getCategoryNameById = async (categoryId: string) => {
  const genre = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/book_category/search?query=${categoryId}`
  );
  const response = await genre.json();
  return response;
};
