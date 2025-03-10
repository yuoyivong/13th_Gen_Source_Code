import React from "react";
import FilterComponent from "./FilterComponent";

export default function HeaderComponent() {
  return (
    <div>
      {/* header */}
      <div className="flex justify-between pb-1.5 border-b border-b-light-blue">
        <p className="capitalize font-semibold text-deep-teal bg-ghost-white py-2.5 items-start px-8 rounded-xl">
          all books
        </p>
        <FilterComponent />
      </div>
    </div>
  );
}
