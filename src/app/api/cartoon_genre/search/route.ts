import { supabase } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// get cartoon genre by id from search params
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const genreId = searchParams?.get("genre");
  

  //   get cartoon genre by id
  const { data: genre, error } = await supabase
    .from("cartoon_genre")
    .select("*")
    .eq("id", parseInt(genreId!))
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
    message: `Get genre successfully`,
    payload: genre,
  });
};
