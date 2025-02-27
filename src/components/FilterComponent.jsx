import { ChevronDown } from "lucide-react";
import React from "react";

export default function FilterComponent() {
  // prevent the page from reload
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="mt-4 mx-4 flex justify-between" onSubmit={handleSubmit}>
      <div className="relative w-full ">
        {/* <input
          type="text"
          placeholder="Filter Learning Materials"
          className="w-5/6 p-4 focus:outline-none"
        /> */}
        <select
          id="filterLearningMaterials"
          name="filterLearningMaterials"
          className="text-sm focus:ring-custom-sky-blue focus:border-custom-sky-blue block w-full p-4 focus:outline-none text-gray-400 border-none rounded-xl bg-light-gray"
        >
          <option hidden value="">
            Sort By
          </option>
          <optgroup label="Sort By">
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </optgroup>
        </select>
        {/* <ChevronDown stroke="#B9B9B9" className="absolute top-4 right-3" /> */}
      </div>
    </form>
  );
}
