import { SearchNormal } from "iconsax-react";
import Form from "next/form";

export default function SearchComponent() {
  return (
    <Form action={"/"}>
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
          name="searchInput"
          placeholder="Search assignment here"
          className="w-full bg-white py-3 pl-14 pr-5 rounded-full h-12 border-none focus:border-none focus:ring-0 focus:outline-deep-teal"
        />
      </div>
    </Form>
  );
}
