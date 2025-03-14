import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { getBookByBookId } from "@/services/book.service";
import { APIResponse, Book, Cartoon } from "@/lib/types";
import { getCartoonById } from "@/services/cartoon.service";
import { Eye } from "iconsax-react";

export const metadata: Metadata = {
  title: "View Article Details",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type: string }>;
}) {
  const { slug } = await params;
  const { type } = await searchParams;
  let book, cartoon;
  if (type === "book") {
    book = (await getBookByBookId(parseInt(slug))) as APIResponse<Book>;
  }

  if (type === "cartoon") {
    cartoon = (await getCartoonById(parseInt(slug))) as APIResponse<Cartoon>;
  }

  const formatDate = (date: Date) => {
    const formattedDate = new Date(date);

    return formattedDate.getFullYear();
  };

  return (
    <div className="bg-white mt-32 max-h-full p-20 rounded-t-[50px]">
      {/* cover image */}
      <div className="flex justify-end relative">
        <Image
          src={book ? book?.payload?.image! : cartoon?.payload?.image!}
          alt="cover"
          width={300}
          height={350}
          className="rounded-3xl drop-shadow-xl absolute -top-52"
        />
      </div>

      {/* content side */}
      <div className="space-y-5 mt-48">
        <div className="space-y-3">
          <h2 className="text-2xl font-medium">
            {book ? book?.payload?.book_title : cartoon?.payload?.ct_title}
          </h2>
          <h3 className="text-xl">
            by{" "}
            <span className="text-deep-teal font-medium capitalize">
              {book ? book?.payload?.book_author : cartoon?.payload?.ct_creator}
            </span>
          </h3>

          {/* for cartoon only */}
          {cartoon && (
            <div className="text-lg text-deep-teal font-medium flex gap-3">
              <p className="flex gap-2  items-center">
                <Eye color="#087E8B" size={22} />{" "}
                <span>{cartoon?.payload?.view_count}</span> times
              </p>{" "}
              <p> | </p>
              <p>{formatDate(cartoon?.payload?.published_year!)}</p>
            </div>
          )}
        </div>
        <p className="text-justify">
          {book ? book?.payload?.description : cartoon?.payload?.ct_description}{" "}
        </p>
      </div>
    </div>
  );
}
