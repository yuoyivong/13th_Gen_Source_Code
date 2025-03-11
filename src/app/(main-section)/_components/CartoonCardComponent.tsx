import { Eye } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

export default function CartoonCardComponent() {
  return (
    <div className="grid grid-cols-3 place-items-center mt-10">
      {/* each cartoon card */}
      <Link
        href={{
          pathname: `/read-full-article/${2}`,
          query: {
            name: "old school cartoons",
            title: "tom and jerry",
          },
        }}
        className="space-y-4"
      >
        <Image
          src={
            "https://i.pinimg.com/736x/7a/02/40/7a0240c94a85023d411c8f0d8dbae508.jpg"
          }
          alt="Cartoon Cover"
          width={314}
          height={398}
          className="rounded-3xl"
        />

        {/* view counts and published year */}
        <div>
          <h2 className="text-xl font-medium mb-1">The Hidden Treasure</h2>

          <div className="text-lg text-deep-teal font-medium flex gap-3">
            <p className="flex gap-2  items-center">
              <Eye color="#087E8B" size={22} /> <span>20</span> times
            </p>{" "}
            <p> | </p>
            <p>1996</p>
          </div>
        </div>
      </Link>

      {/* each cartoon card */}
      <div className="space-y-4">
        <Image
          src={
            "https://i.pinimg.com/736x/7a/02/40/7a0240c94a85023d411c8f0d8dbae508.jpg"
          }
          alt="Cartoon Cover"
          width={314}
          height={398}
          className="rounded-3xl"
        />

        {/* view counts and published year */}
        <div>
          <h2 className="text-xl font-medium mb-1">The Hidden Treasure</h2>

          <div className="text-lg text-deep-teal font-medium flex gap-3">
            <p className="flex gap-2  items-center">
              <Eye color="#087E8B" size={22} /> <span>20</span> times
            </p>{" "}
            <p> | </p>
            <p>1996</p>
          </div>
        </div>
      </div>
      {/* each cartoon card */}
      <div className="space-y-4">
        <Image
          src={
            "https://i.pinimg.com/736x/7a/02/40/7a0240c94a85023d411c8f0d8dbae508.jpg"
          }
          alt="Cartoon Cover"
          width={314}
          height={398}
          className="rounded-3xl"
        />

        {/* view counts and published year */}
        <div>
          <h2 className="text-xl font-medium mb-1">The Hidden Treasure</h2>

          <div className="text-lg text-deep-teal font-medium flex gap-3">
            <p className="flex gap-2  items-center">
              <Eye color="#087E8B" size={22} /> <span>20</span> times
            </p>{" "}
            <p> | </p>
            <p>1996</p>
          </div>
        </div>
      </div>
    </div>
  );
}
