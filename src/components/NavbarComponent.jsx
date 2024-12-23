"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarComponent({ session }) {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center w-full absolute px-24 py-8">
      {/* logo */}
      <p className="uppercase text-3xl">
        my<span className="font-bold">book</span>
      </p>

      <div className="flex justify-between items-center w-1/3 text-lg">
        {/* options - home and books*/}
        <div className="space-x-10 text-white font-semibold">
          <Link
            href={"/home"}
            className={`${
              pathname === "/home"
                ? "border-b-2 border-b-white pb-2"
                : "hover:border-b-2 hover:border-b-white hover:pb-2"
            }`}
          >
            Home
          </Link>
          <Link
            href={"/books?genre=all genres"}
            className={`${
              pathname.includes("/books")
                ? "border-b-2 border-b-white pb-2"
                : "hover:border-b-2 hover:border-b-white hover:pb-2"
            }`}
          >
            Books
          </Link>
        </div>

        {!session ? (
          <Link href={"/login"}>
            <Button className="text-xl px-14 py-6 rounded-full font-bold bg-white">
              Log in
            </Button>
          </Link>
        ) : (
          <Button
            className="text-xl px-14 py-6 rounded-full font-bold bg-white"
            onClick={() => signOut()}
          >
            Log out
          </Button>
        )}
      </div>
    </nav>
  );
}
