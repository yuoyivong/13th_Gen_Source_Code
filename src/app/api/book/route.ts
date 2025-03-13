import { supabase } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// // get all books
export const GET = async () => {
  const { data: books } = await supabase.from("book").select("*");
  return NextResponse.json({
    status: 200,
    message: "success",
    payload: books,
  });
};

