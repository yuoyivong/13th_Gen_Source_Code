import React from "react";

export default function FilterComponent() {
  return (
    <div>
      <div className="relative w-full ">
        {/* <input
          type="text"
          placeholder="Filter Learning Materials"
          className="w-5/6 p-4 focus:outline-none"
        /> */}
        <select
          id="filterByCategory"
          name="filterByCategory"
          className="text-sm focus:ring-custom-sky-blue focus:border-deep-teal block w-full py-3 px-8 focus:outline-none text-gray-400 border-none rounded-xl bg-ghost-white"
        >
          <option hidden value="">
            Filter By Category
          </option>
          <optgroup label="Sort By">
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </optgroup>
        </select>
        {/* <ChevronDown stroke="#B9B9B9" className="absolute top-4 right-3" /> */}
      </div>
    </div>
  );
}
