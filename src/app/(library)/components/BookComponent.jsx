// "use client";
import Image from "next/image";
// import React, { useEffect } from "react";
import ButtonComponent from "./ButtonComponent";
import Link from "next/link";
import { getAllBooks, getBooksByGenreId } from "@/service/bookService";
import { getGenreByGenreId } from "@/service/genreService";
import { getUserInfo } from "@/service/userService";
// import { useStore } from "@/store/store";

export default async function BookComponent({ content, genreId }) {
  // get user info in order to check whether the book is created by that user or not
  const user = await getUserInfo();
  console.log("User : ", user);

  // get book list
  const booksList = await getAllBooks();

  // function to get books by genre id
  async function fetchBooksByGenreId() {
    let books;

    if (genreId !== undefined && genreId !== "all genres") {
      books = await getBooksByGenreId(genreId);
    }
    return books;
  }

  // function to get genre name by its id
  async function fetchGenreByGenreId() {
    let genre;
    if (genreId !== undefined && genreId !== "all genres") {
      genre = await getGenreByGenreId(genreId);
    }

    return genre;
  }

  // variable to store books by genre
  const booksByGenre = await fetchBooksByGenreId();

  // display books based on condition - get all or get by genre id
  const filteredBooks =
    genreId === "all genres" || !genreId ? booksList : booksByGenre;

  // get genre by its id
  const genre = await fetchGenreByGenreId();

  // get data from store
  // const { fetchBooks, books } = useStore();
  // const filteredBooks = books;
  // console.log("Filter : ", books);

  // useEffect(() => {
  //   fetchBooks(); // Fetch books on component mount
  // }, [fetchBooks]);

  return (
    <div className="bg-gray-100 drop-shadow-2xl container mx-auto py-14 rounded-3xl">
      <h2 className="text-3xl font-semibold text-center capitalize">
        {!genre ? content : genre?.payload?.genreName}
      </h2>

      {/* book card */}
      {/* <Link href={"/books/1"}> */}
      <div className="grid grid-cols-2 gap-12 m-12">
        {filteredBooks?.payload?.map((book) => (
          <div
            className=" bg-white p-8 rounded-2xl flex gap-6"
            key={book?.bookId}
          >
            <Image
              src={
                "https://i.pinimg.com/736x/b7/80/17/b780177a368e95c9bab7080ab41b0dc7.jpg"
              }
              alt="image cover"
              width={161}
              height={217}
              className="rounded-lg"
            />

            <div className="flex flex-col justify-between py-5">
              <div className="space-y-2">
                {/* title */}
                <h2 className="text-primary text-2xl capitalize font-semibold truncate w-[460px]">
                  {book?.title}
                </h2>

                {/* author's name */}
                <h3 className="uppercase text-secondary text-xl">
                  {book?.author?.username}
                </h3>

                {/* description */}
                <p className="line-clamp-3 text-gray-400 text-justify">
                  {book?.description}
                </p>
              </div>

              {/* action button */}
              <div className="flex items-end gap-4">
                {/* view book button */}
                <Link href={`/books/${book?.bookId}`}>
                  <ButtonComponent action="view" />
                </Link>

                {/* {user?.payload?.userId === book?.author?.userId && ( */}
                <div className="space-x-4">
                  {/* edit book button */}
                  <Link
                    href={{
                      pathname: `/books/add-edit-book`,
                      query: {
                        edit: true,
                        bookId: book?.bookId,
                      },
                    }}
                  >
                    <ButtonComponent action="edit" />
                  </Link>

                  {/* delete book button */}
                  <ButtonComponent action="delete" book={book} />
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* </Link> */}
    </div>
  );
}
