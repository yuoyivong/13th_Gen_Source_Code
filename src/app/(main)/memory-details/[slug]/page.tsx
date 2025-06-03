import formattedDate from "@/lib/format-date";
import { getRomanticDateById } from "@/services/romantic-date-service";
import { RomanticDate } from "@/types/model/romantic-date";
import { APIResponse } from "@/types/response/api-response";
import { Calendar, Heart } from "iconsax-react";
import Image from "next/image";
import React from "react";

export default async function MemoryDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const romanticDate = (await getRomanticDateById(
    parseInt(slug)
  )) as APIResponse<RomanticDate>;
  console.log("Data : ", romanticDate);

  return (
    <div className="container mx-auto block lg:flex gap-16 px-3 md:px-0">
      {/* left side */}
      <div className="w-full lg:w-1/2 space-y-6">
        {/* title */}
        <div>
          <h2 className="text-2xl font-medium text-dark-cyan flex gap-3 items-center">
            <Heart size="24" color="#309898" variant="Bold" />
            <span className="capitalize">
              {romanticDate?.payload?.location}
            </span>
          </h2>
          <div className="w-1/5 h-0.5 bg-gradient-to-r from-transparent via-dark-cyan/80 to-transparent rounded-full"></div>
        </div>

        {/* description */}
        <p className="text-justify">{romanticDate?.payload?.details}</p>
      </div>

      {/* right side image  */}
      <div className="relative w-full lg:w-1/2 pt-6 lg:pt-0 ">
        <Image
          src={
            "https://i.pinimg.com/736x/69/3b/20/693b20535850f2a3209fb121a05c6ed5.jpg"
          }
          width={736}
          height={1104}
          alt="memory details image"
          className="rounded-4xl object-cover md:mx-auto"
        />

        {/* date */}
        <p className="absolute top-10 lg:top-3 right-3 md:right-7 lg:right-3 bg-white flex gap-3 drop-shadow-steel-gray-xs py-3 px-5 rounded-3xl">
          <Calendar size="24" color="#309898" variant="Broken" />{" "}
          <span className="text-lg font-medium text-dark-cyan">
            {formattedDate(romanticDate?.payload?.date)}
          </span>
        </p>
      </div>
    </div>
  );
}
