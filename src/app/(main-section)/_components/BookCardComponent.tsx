import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BookCardComponent() {
  return (
    <div className="grid grid-cols-2 pt-40 mx-auto w-full place-items-center">
      {/* each card show */}
      <div className="flex px-11 py-7 bg-ghost-white rounded-4xl h-56 max-w-[527px] drop-shadow-sm">
        <div className="relative w-1/2">
          {/* book cover image */}
          <div className="w-45 h-56 relative -top-30">
            <Image
              src={
                "https://i.pinimg.com/736x/4b/94/ff/4b94ff941e7263e7f67e01b77c7cfe41.jpg"
              }
              alt="book cover"
              fill
              className="rounded-2xl drop-shadow-lg"
            />
          </div>

          {/* read full article link */}
          <Link
            href={{
              pathname: `/read-full-article/${2}`,
              query: {
                name: "book categories",
                title: "how do you live?",
              },
            }}
            className="uppercase bg-light-blue absolute bottom-0 px-3.5 py-2.5 rounded-full w-45 hover:bg-deep-teal hover:text-ghost-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1"
          >
            read full article
          </Link>
        </div>

        {/* text description */}
        <div className="w-1/2">
          <h2 className="text-xl font-medium truncate">How Do You Live?</h2>
          <p className="font-light line-clamp-6">
            The novel's enduring themes of self-discovery and ethical living
            continue to resonate, prompting reflections on how one should live a
            meaningful life.
          </p>
        </div>
      </div>
    </div>
  );
}
