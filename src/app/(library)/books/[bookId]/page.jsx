import Image from "next/image";
import React from "react";
import StaticBlueBackground from "../../components/StaticBlueBackground";
import { getBookByBookId } from "@/service/bookService";

export default async function page({ params, searchParams }) {
  // get book by its id
  const { bookId } = await params;

  // get edit status from search params
  const { edit } = await searchParams;

  // pass the book id that gets from params to the below method in order to retrieve its object
  const book = await getBookByBookId(bookId);

  return (
    <div className="pb-[650px]">
      <StaticBlueBackground />

      <div className="container mx-auto">
        <div className="bg-white drop-shadow-2xl rounded-2xl h-auto mt-36 absolute top-32 w-4/5 pb-14">
          <div className="h-[340px]">
            <Image
              className="absolute -top-28 shadow-2xl rounded-xl left-24"
              src={
                "https://i.pinimg.com/736x/d8/6e/53/d86e5331d66dc350bb8e04200bc76755.jpg"
              }
              width={276}
              height={365}
              alt="book cover"
            />

            {/* book title, author name, and book category */}
            <div className="pl-[450px] py-12 capitalize space-y-2">
              {/* book title */}
              <h2 className="text-4xl font-semibold">{book?.payload?.title}</h2>

              {/* author name */}
              <h3 className="text-secondary text-xl">
                by {book?.payload?.author?.username}
              </h3>

              {/* book category */}
              <div className="flex gap-2">
                {book?.payload?.bookGenreList?.map((genre) => (
                  <p
                    className="text-lg bg-gray-100 p-1.5 px-5 rounded-full"
                    key={genre?.genreId}
                  >
                    {genre?.genreName}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* description */}
          <div className="px-24 text-justify">
            <h3 className="text-2xl font-medium pb-3">Description</h3>

            <p className="text-gray-500">{book?.payload?.description} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
