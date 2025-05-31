import Image from "next/image";
import React from "react";

interface AuthorCard {
  id: number;
  image: string;
  title: string;
  description: string;
}

export default function AuthorCardComponent({
  author,
}: {
  author: AuthorCard;
}) {
  return (
    <div className="odd:bg-white-smoke even:bg-white py-16">
      <div
        className={`${
          author?.id === 1 || author?.id === 3
            ? "flex"
            : "flex flex-row-reverse"
        } gap-16 container mx-auto`}
      >
        {/* image */}
        <div className="relative h-auto w-1/2">
          <Image
            src={author?.image}
            fill
            alt={author?.title}
            className="rounded-4xl object-cover"
          />
        </div>

        {/* block content */}
        <div className="w-1/2 text-justify space-y-6">
          {/* title */}
          <h1
            className={`${
              author?.id === 1
                ? "text-dark-cyan"
                : author?.id === 2
                ? "text-coral-pink"
                : "text-orange-peel"
            } text-2xl font-semibold`}
          >
            {author?.title}
          </h1>

          {author?.id === 3 && (
            <h3 className="font-bold">
              “Stay curious, keep building, and never stop evolving.”
            </h3>
          )}

          {/* description */}
          <p>{author?.description}</p>
        </div>
      </div>
    </div>
  );
}
