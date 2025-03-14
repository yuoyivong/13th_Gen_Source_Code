import { Book } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BookCardComponent({ book }: { book: Book }) {
  return (
    <div className="flex px-11 py-7 bg-ghost-white rounded-4xl h-58 max-w-[527px] drop-shadow-sm">
      <div className="relative w-1/2">
        {/* book cover image */}
        <div className="w-45 h-62 relative -top-34">
          <Image
            src={book?.image}
            alt={book?.book_title}
            fill
            className="rounded-2xl drop-shadow-lg"
          />
        </div>

        {/* read full article link */}
        <Link
          href={{
            pathname: `/read-full-article/${book?.id}`,
            query: {
              type: "book",
              name: "book categories",
              title: book?.book_title,
            },
          }}
          className="uppercase bg-light-blue absolute bottom-0 px-3.5 py-2.5 rounded-full w-45 hover:bg-deep-teal hover:text-ghost-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1"
        >
          read full article
        </Link>
      </div>

      {/* text description */}
      <div className="w-1/2">
        <h2 className="text-xl font-medium truncate">{book?.book_title}</h2>
        <p className="font-light line-clamp-6 text-justify">
          {book?.description}
        </p>
      </div>
    </div>
  );
}
