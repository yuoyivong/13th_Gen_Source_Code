import { supabase } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// get book by id
export const GET = async (_: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const { data: book } = await supabase
    .from("book")
    .select("*")
    .eq("id", id)
    .single();

  console.log(book);
  return NextResponse.json({
    status: 200,
    message: `Get book with id ${id} successfully.`,
    payload: book,
  });
};
