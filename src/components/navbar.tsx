import React from "react";
import LogoComponent from "./logo";
import Link from "next/link";

export default function NavbarComponent() {
  return (
    <nav className="flex items-center justify-between py-6 sticky top-0 bg-white/80 z-50 backdrop-blur-xs">
      {/* logo */}
      <div className="text-2xl">
        <LogoComponent />
      </div>

      {/* link */}
      <div className=" font-medium space-x-6 text-lg">
        <Link href={"/romantic-date"}>Romantic Dates</Link>
        <Link href={"/about-author"}>About Author</Link>
      </div>

      {/* sign up and login button */}
      <div className="space-x-6 font-medium text-lg">
        <Link
          href={"/register"}
          className="text-dark-cyan hover:text-dark-blue"
        >
          Sign Up
        </Link>
        <Link
          href={"/login"}
          className="bg-dark-cyan rounded-lg py-2 px-6 text-white hover:bg-dark-blue"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
