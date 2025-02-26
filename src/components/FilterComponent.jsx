import { ChevronDown } from "lucide-react";
import React from "react";

export default function FilterComponent() {
  // prevent the page from reload
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="mt-4 mx-4 flex justify-between" onSubmit={handleSubmit}>
      <div className="relative w-full bg-light-gray rounded-xl">
        <input
          type="text"
          placeholder="Filter Learning Materials"
          className="w-5/6 p-4 focus:outline-none"
        />
        <ChevronDown stroke="#B9B9B9" className="absolute top-4 right-3" />
      </div>
    </form>
  );
}
