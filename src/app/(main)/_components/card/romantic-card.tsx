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
    <div className="space-y-4 w-full">
      <div className="w-full h-64 relative">
        {/* image */}
        <Image
          src={
            item?.gallery?.toString() ||
            "https://i.pinimg.com/736x/e3/30/48/e330483583aba61ecdedfd80d9103388.jpg"
          }
          fill
          alt={item?.location}
          className="rounded-3xl object-cover"
        />

        {/* edit and delete icons */}
        {session && (
          <div className="p-2 flex flex-col gap-2 items-end">
            <DeletePopup id={item?.id} />
            {/* edit popup */}
            <MemoryPopup type="edit" id={item?.id} />
          </div>
        )}
      </div>

      <div className="text-dark-cyan flex justify-between items-center w-full">
        <h3 className="text-xl font-medium capitalize truncate w-2/3">
          {item?.location}
        </h3>

        <p className="flex gap-2 w-1/2 justify-end">
          <Calendar size="20" color="#309898" variant="Broken" />
          <span>{formattedDate(item?.date)}</span>
        </p>
      </div>

      {/* description */}
      <p className="line-clamp-3 text-justify h-18 w-full break-all">
        {item?.details}
      </p>

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
