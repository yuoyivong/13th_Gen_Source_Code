"use client";
import { sidebarList } from "@/data/sidebar";
import { Setting2 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarComponent() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen bg-white w-full flex flex-col items-center space-y-8 py-5">
      {/* user profile */}
      <div className="flex flex-col items-center">
        <Image
          src={
            "https://i.pinimg.com/736x/44/75/bd/4475bde75fb129f2f65f00a494e2446b.jpg"
          }
          alt="User profile - single cute boy"
          width={168}
          height={160}
          className="rounded-full"
        />

        {/* name */}
        <h2 className="text-2xl pt-2">Black Monster</h2>
        <h3 className="text-xl text-deep-teal">blackmonster@gmail.com</h3>
      </div>

      {/* sidebar list */}
      <div className="w-10/12">
        {sidebarList?.map((sidebar) => (
          <div key={sidebar?.id} className="hover:rounded-xl hover:bg-gray-100">
            <Link
              href={sidebar?.href ? sidebar?.href : ""}
              className={`${
                sidebar?.href
                  ? "cursor-pointer hover:font-medium"
                  : "cursor-default"
              } ${
                sidebar?.href === pathname && "bg-light-blue/40 rounded-xl"
              } flex gap-3 items-start py-2.5 px-8 `}
            >
              <sidebar.icon size={22} color="#C81D25" />
              <span className="text-lg">{sidebar?.label}</span>
            </Link>
          </div>
        ))}
      </div>

      {/* settings */}

      <div className="w-10/12 text-lg bg-ghost-white hover:bg-gray-200 flex gap-3 py-3 px-8 rounded-xl">
        <Setting2 size={24} color="#0B3954" />
        <span>Settings</span>
      </div>
    </aside>
  );
}
