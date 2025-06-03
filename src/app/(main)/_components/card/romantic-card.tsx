import { ArrowRight, Calendar } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeletePopup from "../popup/delete-popup";
import MemoryPopup from "../popup/memory-popup";
import { RomanticDate } from "@/types/model/romantic-date";
import { Session } from "@/types/auth/session";
import formattedDate from "@/lib/format-date";

export default function RomanticCardComponent({
  item,
  session,
}: {
  item: RomanticDate;
  session: Session | null;
}) {
  return (
    <div className="space-y-4">
      <div className="w-full h-64 relative">
        {/* image */}
        <Image
          src={
            "https://i.pinimg.com/736x/e3/30/48/e330483583aba61ecdedfd80d9103388.jpg"
          }
          fill
          alt={item?.location}
          className="rounded-3xl object-cover"
        />

        {/* edit and delete icons */}
        {session && (
          <div className="p-2 flex flex-col gap-2 items-end">
            <DeletePopup />
            {/* edit popup */}
            <MemoryPopup type="edit" />
          </div>
        )}
      </div>

      <div className="text-dark-cyan flex justify-between items-center">
        <h3 className="text-xl font-medium capitalize">{item?.location}</h3>

        <p className="flex gap-2">
          <Calendar size="20" color="#309898" variant="Broken" />
          <span>{formattedDate(item?.date)}</span>
        </p>
      </div>

      {/* description */}
      <p className="line-clamp-3 text-justify h-20">{item?.details}</p>

      {/* read more button */}
      <div className="relative group w-fit ml-auto pl-4">
        {/* Invisible by default, vertical line appears on hover */}
        <span className="absolute left-0 top-0 w-0.5 h-0 bg-crimson-red transition-all duration-300 group-hover:h-full"></span>

        <Link
          href={`/memory-details/${item?.id}`}
          className="flex gap-3 items-center justify-end hover:text-dark-cyan transition-all duration-300"
        >
          <span className="capitalize text-crimson-red">read more</span>
          <ArrowRight size="24" color="#CB0404" variant="Broken" />
        </Link>
      </div>
    </div>
  );
}
