"use server";

import { revalidateTag } from "next/cache";

const {
  insertNewBook,
  updateBookByBookId,
  deleteBookByBookId,
  getAllBooks,
} = require("@/service/bookService");

// create new book action
const createNewBookAction = async (data) => {
  const book = await insertNewBook(data);

  return book;
};

// update book by id
const updateBookAction = async (bookId, data) => {
  const updatedBook = await updateBookByBookId(bookId, data);
  return updatedBook;
};

// delete book by id
const removeBookAction = async (bookId) => {
  const removedBook = await deleteBookByBookId(bookId);
  // revalidateTag("get-all-books");
  return removedBook;
};

const getBooks = async () => {
  const res = await getAllBooks();
  return res;
};

// expose each method to publicly use
export { createNewBookAction, updateBookAction, removeBookAction, getBooks };
