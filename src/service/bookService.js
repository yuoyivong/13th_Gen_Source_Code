import { headerToken } from "@/libs/headerToken";

// get all books
const getAllBooks = async () => {
  const headerReq = await headerToken();

  const data = await fetch(
    `${process.env.AUTH_BASE_URL}/books?pageNo=0&pageSize=10&sortBy=bookId&sortDirection=ASC`,
    {
      method: "GET",
      headers: headerReq,
      next: { tags: "get-all-books" },
    }
  );
  const res = await data.json();
  return res;
};

// get book by book id
const getBookByBookId = async (bookId) => {
  const headerReq = await headerToken();
  const book = await fetch(`${process.env.AUTH_BASE_URL}/book/${bookId}`, {
    headers: headerReq,
  });
  const res = await book.json();
  return res;
};

// get all books by genre id
const getBooksByGenreId = async (genreId) => {
  const headerReq = await headerToken();
  const data = await fetch(
    `${process.env.AUTH_BASE_URL}/books/genre/${genreId}`,
    {
      headers: headerReq,
    }
  );
  const res = await data.json();
  return res;
};

// create new book
const insertNewBook = async (data) => {
  const headerReq = await headerToken();
  const book = await fetch(`${process.env.AUTH_BASE_URL}/book`, {
    method: "POST",
    headers: headerReq,
    body: JSON.stringify(data),
    next: { tags: "all-books" },
  });
  const res = await book.json();
  return res;
};

// update book method
const updateBookByBookId = async (bookId, data) => {
  const headerReq = await headerToken();
  const updatedBook = await fetch(
    `${process.env.AUTH_BASE_URL}/book/${bookId}`,
    {
      method: "PUT",
      headers: headerReq,
      body: JSON.stringify(data),
    }
  );
  const res = await updatedBook.json();
  return res;
};

// delete book by book id
const deleteBookByBookId = async (bookId) => {
  const headerReq = await headerToken();
  const deletedBook = await fetch(
    `${process.env.AUTH_BASE_URL}/book/${bookId}`,
    {
      method: "DELETE",
      headers: headerReq,
    }
  );
  const res = await deletedBook.json();
  return res;
};

// expose method to the outside
export {
  getAllBooks,
  getBookByBookId,
  getBooksByGenreId,
  insertNewBook,
  updateBookByBookId,
  deleteBookByBookId,
};
