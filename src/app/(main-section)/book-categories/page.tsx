import React, { Suspense } from "react";
import BookCardComponent from "../_components/BookCardComponent";
import type { Metadata } from "next";
import { getAllBooks } from "@/services/book.service";
import { Book } from "@/lib/types";

export const metadata: Metadata = {
  title: "Book Categories",
};

export default async function BookCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string; search: string }>;
}) {
  const { query, search } = await searchParams;
  const bookList = await getAllBooks(query, search);

  return (
    <div className="grid grid-cols-2 pt-40 mx-auto w-full place-items-center">
      {/* card component */}
      {bookList?.payload?.map((book: Book) => (
        <div key={book?.id}>
          <Suspense>
            <BookCardComponent book={book} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}
