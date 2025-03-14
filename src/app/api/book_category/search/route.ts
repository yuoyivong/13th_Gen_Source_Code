import { supabase } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// get cartoon genre by id from search params
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const categoryId = searchParams?.get("query");
  

  //   get cartoon genre by id
  const { data: category, error } = await supabase
    .from("book_category")
    .select("*")
    .eq("id", parseInt(categoryId!))
    .single();

  if (error) {
    console.error("Error fetching genre:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching genre",
      error,
    });
  }

  return NextResponse.json({
    status: 200,
    message: `Get book category successfully`,
    payload: category,
  });
};
