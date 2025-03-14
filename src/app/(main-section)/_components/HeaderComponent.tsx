"use client";
import { usePathname, useSearchParams } from "next/navigation";
import FilterComponent from "./FilterComponent";
import { getGenreNameByGenreId } from "@/action/genre.action";
import { useEffect, useState } from "react";
import { APIResponse, BookCategory, Genre } from "@/lib/types";
import { getCategoryNameByCategoryId } from "@/action/category.action";

export default function HeaderComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // set genre name
  const [genre, setGenre] = useState<APIResponse<Genre>>();
  const [category, setCategory] = useState<APIResponse<BookCategory>>();

  const fetchGenreName = async () => {
    const res = await getGenreNameByGenreId(searchParams?.get("genre")!);
    setGenre(res);
  };

  const fetchCategoryName = async () => {
    const res = await getCategoryNameByCategoryId(searchParams?.get("query")!);
    setCategory(res);
  };

  useEffect(() => {
    fetchGenreName();
    fetchCategoryName();
  }, [searchParams?.get("genre") || searchParams?.get("query")]);

  return (
    <div>
      {/* header */}
      <div className="flex justify-between pb-1.5 border-b border-b-light-blue">
        <p className="capitalize font-semibold text-deep-teal bg-ghost-white py-2.5 items-start px-8 rounded-xl">
          {pathname === "/"
            ? "Homepage"
            : pathname === "/book-categories"
            ? category?.payload?.book_cate_name || "All Books"
            : genre?.payload?.cartoon_genre || "Old School Cartoons"}
        </p>

        {pathname !== "/" && <FilterComponent />}
      </div>
    </div>
  );
}
