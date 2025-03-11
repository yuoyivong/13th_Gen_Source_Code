"use client";
import { usePathname } from "next/navigation";
import FilterComponent from "./FilterComponent";

export default function HeaderComponent() {
  const pathname = usePathname();
  return (
    <div>
      {/* header */}
      <div className="flex justify-between pb-1.5 border-b border-b-light-blue">
        <p className="capitalize font-semibold text-deep-teal bg-ghost-white py-2.5 items-start px-8 rounded-xl">
          {pathname === "/"
            ? "Homepage"
            : pathname === "/book-categories"
            ? "All Books"
            : "Old School Cartoons"}
        </p>

        {pathname !== "/" && <FilterComponent />}
      </div>
    </div>
  );
}
