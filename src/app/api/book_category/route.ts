import { supabase } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// get all book category
export const GET = async () => {
  const { data: categories } = await supabase.from("book_category").select("*");

  return NextResponse.json({
    status: 200,
    message: "success",
    payload: categories,
  });
};


// get category name
// export const GET = async(request : NextRequest ) => {

// }