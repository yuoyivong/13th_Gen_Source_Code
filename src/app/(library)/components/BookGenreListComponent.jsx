"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BookGenreListComponent({ allGenres }) {
  const { replace } = useRouter();

  // set active state via current pathname
  const searchParams = useSearchParams();

  // state to handle on dynamic search params
  const [filterGenre, setFilterGenre] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  useEffect(() => {
    setFilterGenre(searchParams?.get("genre"));
    setSearchGenre(searchParams?.get("query"));
  }, [searchParams]);

  // function to set search params to url
  const handleFilterGenre = (genreId) => {
    replace(
      `?genre=${genreId ? genreId : "all genres"}${
        searchGenre ? `&query=${searchGenre}` : ""
      }`,
      {
        scroll: false,
      }
    );
  };

  return (
    <div className="space-y-5 text-lg sticky top-[117px]">
      <h3 className="capitalize">book by genre</h3>

      {/* book genre list */}
      <div className="cursor-pointer">
        <div
          onClick={() => handleFilterGenre("")}
          className={`${
            filterGenre === "all genres"
              ? "max-w-[221px] bg-white text-secondary border-l-2 border-l-secondary rounded-lg"
              : "my-2"
          }`}
        >
          <p className="px-5 py-1.5">All Genres</p>
        </div>

        {/* list down geners */}
        {allGenres?.payload
          ?.filter((genre) =>
            searchGenre
              ? genre?.genreName
                  ?.toLowerCase()
                  .includes(searchGenre?.toLowerCase())
              : true
          )
          .map((genre) => (
            <div
              key={genre?.genreId}
              className={`${
                filterGenre === genre?.genreId
                  ? "max-w-[221px] bg-white text-secondary border-l-2 border-l-secondary rounded-lg"
                  : "my-2 max-w-[221px]"
              }`}
              onClick={() => handleFilterGenre(genre?.genreId)}
            >
              <p className="px-5 py-1.5 truncate">{genre?.genreName}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
