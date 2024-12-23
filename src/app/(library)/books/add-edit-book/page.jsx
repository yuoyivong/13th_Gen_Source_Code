import React from "react";
import StaticBlueBackground from "../../components/StaticBlueBackground";
import AddEditBookComponent from "../../components/AddEditBookComponent";
import { getAllGenres } from "@/service/genreService";
import { getBookByBookId } from "@/service/bookService";

export default async function page({ searchParams }) {
  const { edit, bookId } = await searchParams;

  // get genres list
  const genresList = await getAllGenres();

  // get book by id
  const book = bookId && (await getBookByBookId(bookId));

  return (
    <div>
      <StaticBlueBackground />

      {/* add new book form */}
      <div className="flex justify-center">
        <div className="absolute top-28 w-3/5 bg-gray-200 py-16 mt-16 rounded-2xl drop-shadow-2xl space-y-8">
          <h2 className="text-3xl font-semibold capitalize text-center">
            {edit ? "edit book" : "add new book"}
          </h2>
          <AddEditBookComponent
            genresList={genresList}
            book={book}
            edit={edit}
            bookId={bookId}
          />
        </div>
      </div>
    </div>
  );
}
