import { Plus } from "lucide-react";
import React from "react";
import BookComponent from "../components/BookComponent";
import SearchComponent from "../components/SearchComponent";
import BookGenreListComponent from "../components/BookGenreListComponent";
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";
import Link from "next/link";
import { auth } from "@/auth";
import { getAllBooks } from "@/service/bookService";
import { getAllGenres } from "@/service/genreService";

export default async function Bookpage({ searchParams }) {
  // get session and pass to navbar
  const session = await auth();

  // get all books from api
  const booksList = await getAllBooks();

  // get all genres
  const allGenres = await getAllGenres();

  // get genre value from search params
  const { genre } = await searchParams;

  return (
    <>
      {/* navbar */}
      <NavbarComponent session={session} />

      {/* content */}
      <div>
        <div className="bg-book-page-header h-[613px] bg-right bg-no-repeat">
          <div className="container mx-auto pt-52">
            {/* right size content */}
            <h1 className="uppercase text-[75px] font-bold">all books</h1>

            {/* description */}
            <p className="capitalize text-xl pt-5">
              <Link href={"/books/add-edit-book"}>
                <button className="capitalize flex gap-4 items-center bg-secondary py-2.5 px-6 rounded-2xl font-semibold">
                  <Plus /> add new book
                </button>
              </Link>
            </p>
          </div>
        </div>

        {/* book list */}
        <div className="max-h-auto bg-gray-100 py-14 flex gap-6 px-8">
          <div className="space-y-5">
            <SearchComponent />
            <BookGenreListComponent allGenres={allGenres} />
          </div>

          <BookComponent content={"All Books Genres"} genreId={genre} />
        </div>
      </div>

      {/* footer */}
      <FooterComponent />
    </>
  );
}
