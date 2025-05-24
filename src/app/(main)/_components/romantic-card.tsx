import { ArrowRight, Calendar } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RomanticCardComponent() {
  return (
    <div className="space-y-4">
      <div className="w-full h-[263px] relative">
        {/* image */}
        <Image
          src={
            "https://i.pinimg.com/736x/e3/30/48/e330483583aba61ecdedfd80d9103388.jpg"
          }
          fill
          alt="Switzerland image"
          className="rounded-3xl object-cover"
        />
      </div>

      <div className="text-dark-cyan flex justify-between items-center">
        <h3 className="text-xl font-medium">Switzerland</h3>

        <p className="flex gap-2">
          <Calendar size="20" color="#309898" variant="Broken" />
          <span>Jan 26, 2025</span>
        </p>
      </div>

      {/* description */}
      <p className="line-clamp-3 text-justify h-20">
        This picture was taken in Europe. I went there last month with my
        special person. It was such a romantic date.
      </p>

      {/* read more button */}
      <Link
        href={"/memory-details/1"}
        className="flex gap-3 items-center justify-end"
      >
        <span className="capitalize text-crimson-red">read more</span>{" "}
        <ArrowRight size="24" color="#CB0404" variant="Broken" />
      </Link>
    </div>
  );
}
