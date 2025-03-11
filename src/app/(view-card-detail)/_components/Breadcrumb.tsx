"use client";
import { ArrowRight2, Book, Book1, Home2, Link2 } from "iconsax-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Breadcrumb() {
  const searchParams = useSearchParams();
  const { back } = useRouter();

  return (
    <div className="flex gap-5 items-center">
      {/* home icon */}
      <Link
        href="/"
        className="flex gap-2 font-medium text-lg items-center hover:text-deep-teal group"
      >
        {/* Default Icon (Shows initially) */}
        <Home2 size={22} color="#0B3954" className="group-hover:hidden" />

        {/* Hover Icon (Appears on hover) */}
        <Link2
          size={22}
          color="#087E8B"
          className=" hidden group-hover:block"
        />

        <p>Home</p>
      </Link>

      {/* arrow icon */}
      <ArrowRight2 size={22} color="#0B3954" />

      {/* book icon */}

      <div
        onClick={back}
        className="flex gap-2 font-medium text-lg items-center hover:text-deep-teal group cursor-pointer"
      >
        {/* Default Icon (Shows initially) */}
        <Book size={22} color="#0B3954" className="group-hover:hidden" />

        {/* Hover Icon (Appears on hover) */}
        <Link2
          size={22}
          color="#087E8B"
          className=" hidden group-hover:block"
        />

        <p className="capitalize">{searchParams?.get("name")}</p>
      </div>

      {/* arrow icon */}
      <ArrowRight2 size={22} color="#0B3954" />

      {/* book icon */}
      <div className="flex gap-2 font-medium text-lg items-center">
        <Book1 size={22} color="#C81D25" />
        <p className="text-red-crimson capitalize">
          {searchParams?.get("title")}
        </p>
      </div>
    </div>
  );
}
