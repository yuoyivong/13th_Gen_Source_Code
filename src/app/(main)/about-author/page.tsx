import React from "react";
import AuthorCardComponent from "../_components/author-card";
import authorDataList from "@/data/author-data";

export default function AboutAuthorPage() {
  return (
    <main>
      {authorDataList?.map((author) => (
        <AuthorCardComponent key={author?.id} author={author} />
      ))}
    </main>
  );
}
