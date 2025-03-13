import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { getBookByBookId } from "@/services/book.service";
import { APIResponse, Book } from "@/lib/types";

export const metadata: Metadata = {
  title: "View Article Details",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = (await getBookByBookId(parseInt(slug))) as APIResponse<Book>;

  return (
    <div className="bg-white mt-32 max-h-full p-20 rounded-t-[50px]">
      {/* cover image */}
      <div className="flex justify-end relative">
        <Image
          src={book?.payload?.image}
          alt="cover"
          width={230}
          height={350}
          className="rounded-3xl drop-shadow-xl absolute -top-52"
        />
      </div>

      {/* content side */}
      <div className="space-y-5 mt-36">
        <div>
          <h2 className="text-2xl font-medium">{book?.payload?.book_title}</h2>
          <h3 className="text-xl">
            by{" "}
            <span className="text-deep-teal font-medium capitalize">
              {book?.payload?.book_author}
            </span>
          </h3>
        </div>
        <p className="text-justify">{book?.payload?.description} </p>
      </div>
    </div>
  );
}
