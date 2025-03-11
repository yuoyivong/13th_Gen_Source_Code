import { Tag2 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-20 justify-center py-27">
      {/* link to view book page */}
      <Link href={"/book-categories"}>
        <div className="relative">
          <Image
            src={
              "https://i.pinimg.com/736x/68/71/ee/6871eef27c349c487ef5d5b735bb3c41.jpg"
            }
            alt="book cover"
            width={314}
            height={398}
            className="rounded-3xl"
          />

          {/* tag */}
          <div className="z-10 bg-white flex gap-2 absolute top-3 left-3 px-2.5 py-1 rounded-full items-center">
            <Tag2 size={16} color="#087E8B" />
            <p className="text-deep-teal font-medium">Book</p>
          </div>

          {/* show bg black on hover */}
          <div className="absolute top-0 w-full h-full rounded-3xl flex items-center justify-center bg-black/0 hover:bg-black/35 opacity-0 hover:opacity-100 transition-opacity duration-300 text-center">
            <p className="text-4xl text-white w-44">View All Available Books</p>
          </div>
        </div>
      </Link>

      {/* link to view book page */}
      <Link href={"/old-school-cartoons"}>
        <div className="relative">
          <Image
            src={
              "https://i.pinimg.com/736x/48/6c/bb/486cbb07a669a7cc1c3fa6d41ca9a828.jpg"
            }
            alt="cartoon cover"
            width={314}
            height={398}
            className="rounded-3xl"
          />

          {/* tag */}
          <div className="z-10 bg-white flex gap-2 absolute top-3 left-3 px-2.5 py-1 rounded-full items-center">
            <Tag2 size={16} color="#087E8B" />
            <p className="text-deep-teal font-medium">Cartoon</p>
          </div>

          {/* show bg black on hover */}
          <div className="absolute top-0 w-full h-full rounded-3xl flex items-center justify-center bg-black/0 hover:bg-black/35 opacity-0 hover:opacity-100 transition-opacity duration-300 text-center">
            <p className="text-4xl text-white w-44">
              View All Available Cartoons
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
