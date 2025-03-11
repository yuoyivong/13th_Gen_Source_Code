import React from "react";
import BookCardComponent from "../_components/BookCardComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Categories",
};

export default function BookCategoriesPage() {
  return (
    <div>
      {/* card component */}
      <BookCardComponent />
    </div>
  );
}
