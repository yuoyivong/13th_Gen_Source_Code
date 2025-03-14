import React, { Suspense } from "react";
import CartoonCardComponent from "../_components/CartoonCardComponent";
import type { Metadata } from "next";
import { getAllCartoon } from "@/services/cartoon.service";
import { APIResponse, Cartoon } from "@/lib/types";

export const metadata: Metadata = {
  title: "Old School Cartoons",
};

export default async function OldSchoolCartoonPage({
  searchParams,
}: {
  searchParams: Promise<{ genre: string; search: string }>;
}) {
  const { genre, search } = await searchParams;
  const cartoonList = (await getAllCartoon(genre, search)) as APIResponse<
    Cartoon[]
  >;

  return (
    <div className="grid grid-cols-3 place-items-center mt-10">
      {cartoonList?.payload?.map((cartoon) => (
        <div key={cartoon?.id}>
          <Suspense fallback={<p>Loading ...</p>}>
            <CartoonCardComponent cartoon={cartoon} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}
