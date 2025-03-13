// get all books from database
export const getAllBooks = async () => {
  const bookList = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/book`);

  const books = await bookList.json();

  return books;
};

// get book by id
export const getBookByBookId = async (id: number) => {
  const book = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/book/${id}`);
  const response = await book.json();
  return response;
};
