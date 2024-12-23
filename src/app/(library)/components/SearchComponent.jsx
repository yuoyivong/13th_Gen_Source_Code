"use client";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function SearchComponent() {
  // set the value from search input to url
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    const search = new URLSearchParams(searchParams);

    if (term) {
      search.set("query", term);
    } else {
      search.delete("query");
    }
    replace(`${pathname}?${search.toString()}`, { scroll: false });
  };

  return (
    <Input
      classNames={{
        base: "sticky top-14 max-w-full sm:max-w-[15rem] h-10 border-2 border-secondary rounded-xl bg-white",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper: "h-full font-normal text-default-500 ",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
