import { Cartoon } from "@/lib/types";
import { Eye } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

export default function CartoonCardComponent({
  cartoon,
}: {
  cartoon: Cartoon;
}) {
  const formatDate = (date: Date) => {
    const formattedDate = new Date(date);

    return formattedDate.getFullYear();
  };
  return (
    <div>
      {/* each cartoon card */}
      <Link
        href={{
          pathname: `/read-full-article/${cartoon?.id}`,
          query: {
            type: "cartoon",
            name: "old school cartoons",
            title: cartoon?.ct_title,
          },
        }}
        className="space-y-4"
      >
        <Image
          src={cartoon?.image}
          alt={cartoon?.ct_title}
          width={314}
          height={398}
          className="rounded-3xl"
        />

        {/* view counts and published year */}
        <div>
          <h2 className="text-xl font-medium mb-1">{cartoon?.ct_title}</h2>

          <div className="text-lg text-deep-teal font-medium flex gap-3">
            <p className="flex gap-2  items-center">
              <Eye color="#087E8B" size={22} />{" "}
              <span>{cartoon?.view_count}</span> times
            </p>{" "}
            <p> | </p>
            <p>{formatDate(cartoon?.published_year)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
