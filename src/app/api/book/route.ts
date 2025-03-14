import { supabase } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// // get all books
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const bookCategoryId = searchParams.get("query");
  const searchBook = searchParams.get("search");
  
  

  let bookList = supabase.from("book").select("*");

  if (bookCategoryId && !isNaN(parseInt(bookCategoryId))) {
    bookList = bookList.eq("book_cate_id", parseInt(bookCategoryId));
  }

  if (searchBook) {
    bookList = bookList.ilike("book_title", `%${searchBook}%`);
    
  }

  const { data: books, error } = await bookList;
  

  if (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching data",
      error,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "success",
    payload: books,
  });
};
