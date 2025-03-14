import { supabase } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// get book by id
export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const { data: book } = await supabase
    .from("book")
    .select("*")
    .eq("id", id)
    .single();

  return NextResponse.json({
    status: 200,
    message: `Get book with id ${id} successfully.`,
    payload: book,
  });
};
