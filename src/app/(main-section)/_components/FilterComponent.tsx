"use client";
import { getAllBookCategory } from "@/action/category.action";
import { getAllGenres } from "@/action/genre.action";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APIResponse, BookCategory, Genre } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FilterComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categoryList, setCategoryList] =
    useState<APIResponse<BookCategory[]>>();

  const [genreList, setGenreList] = useState<APIResponse<Genre[]>>();

  // function to update url search params
  const handleFilterCategory = () => {
    const params = new URLSearchParams(searchParams?.toString());
    if (selectedCategory) {
      if (pathname === "/book-categories") {
        params.set("query", selectedCategory);
      } else if (pathname === "/old-school-cartoons") {
        params.set("genre", selectedCategory);
      } else {
        params.delete("query");
        params.delete("genre");
      }
    }
    router.push(`?${params?.toString()}`);
  };

  // fetch book category
  const fetchBookCategory = async () => {
    const categories = await getAllBookCategory(
      searchParams?.get("query") || ""
    );

    setCategoryList(categories);
  };

  // fetch get all genre
  const fetchCartoonGenres = async () => {
    const genres = await getAllGenres();
    setGenreList(genres);
  };

  useEffect(() => {
    handleFilterCategory();
  }, [selectedCategory]);

  useEffect(() => {
    fetchBookCategory();
    fetchCartoonGenres();
  }, []);

  // Reset selected category when pathname changes
  useEffect(() => {
    setSelectedCategory("");
  }, [pathname]);

  return (
    <Select
      value={selectedCategory}
      onValueChange={(value) => setSelectedCategory(value)}
    >
      <SelectTrigger className="w-1/5 h-10 border-none bg-ghost-white rounded-lg p-4 cursor-pointer">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter by Category</SelectLabel>
          {pathname === "/book-categories" && (
            <div>
              {categoryList?.payload?.map((category) => (
                <SelectItem value={category?.id?.toString()} key={category?.id}>
                  {category?.book_cate_name}
                </SelectItem>
              ))}
            </div>
          )}

          {pathname === "/old-school-cartoons" && (
            <div>
              {genreList?.payload?.map((genre) => (
                <SelectItem value={genre?.id?.toString()} key={genre?.id}>
                  {genre?.cartoon_genre}
                </SelectItem>
              ))}
            </div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
