// get all books from database
export const getAllBooks = async (book_category_id: string, search: string) => {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/book?`;
  if (book_category_id) {
    url += `query=${book_category_id}`;
  }

  if (search) {
    url += `search=${search}`;
  }

  const bookList = await fetch(url);

  const books = await bookList.json();

  

  return books;
};

// get book by id
export const getBookByBookId = async (id: number) => {
  const book = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/book/${id}`);
  const response = await book.json();
  return response;
};
