import { supabase } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { data: cartoonGenres } = await supabase
    .from("cartoon_genre")
    .select("*");

  return NextResponse.json({
    status: 200,
    message: "success",
    payload: cartoonGenres,
  });
};
