"use client";
import { SearchNormal } from "iconsax-react";
import Form from "next/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function SearchComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  // navigate user to either cartoon or book based on condition
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const currentPath = pathname.includes("/old-school-cartoons")
      ? "/old-school-cartoons"
      : "/book-categories";

    const newUrl = `${currentPath}?search=${search}`;

    router.push(newUrl);
  };

  // clear search value
  useEffect(() => {
    setSearch("");
  }, [pathname]);

  // set search to search input
  useEffect(() => {
    if (searchParams?.get("search")) {
      setSearch(searchParams?.get("search") || "");
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} action="">
      <div className="relative">
        {/* search button */}
        <button className="cursor-pointer">
          <SearchNormal
            size={20}
            color="#B9B9B9"
            className="absolute top-3.5 left-5"
          />
        </button>

        {/* search input */}
        <input
          type="text"
          name="search"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search book or category"
          className="w-full bg-white py-3 pl-14 pr-5 rounded-full h-12 border-none focus:border-none focus:ring-0 focus:outline-deep-teal"
        />
      </div>
    </Form>
  );
}
