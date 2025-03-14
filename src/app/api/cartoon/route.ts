import { supabase } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// get all cartoon
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const genreId = searchParams.get("genre");
  const searchCartoon = searchParams.get("search");

  let cartoonList = supabase.from("cartoon").select("*");

  if (genreId && !isNaN(parseInt(genreId))) {
    cartoonList = cartoonList.eq("ct_genre_id", parseInt(genreId));
  }

  if (searchCartoon) {
    cartoonList = cartoonList.ilike("ct_title", `%${searchCartoon}%`);
  }

  const { data: allCartoons, error } = await cartoonList;

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
    message: "Get all cartoons successfully.",
    payload: allCartoons,
  });
};
