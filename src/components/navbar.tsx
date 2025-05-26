"use client";
import React, { useState } from "react";
import LogoComponent from "./logo";
import Link from "next/link";
import { HambergerMenu } from "iconsax-react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavbarComponent() {
  // responsive on mobile
  const [isMobile, setIsMobile] = useState(false);

  // active link
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  return (
    <>
      <nav className="sticky top-0 bg-white/80 z-50 backdrop-blur-xs">
        <div className="flex items-center justify-between py-6 container mx-auto transition-all duration-300 pl-3 md:px-0">
          {/* logo */}
          <div className="text-3xl md:text-2xl transform transition-transform duration-200 hover:scale-105">
            <LogoComponent />
          </div>

          {/* link */}
          {/* desktop navigation links - hidden on mobile */}
          <div className="hidden md:block font-medium space-x-6 text-lg">
            <Link
              href={"/romantic-date"}
              className={`relative hover:text-dark-cyan transition-all duration-300 group ${
                pathname === "/romantic-date" ? "text-coral-pink" : ""
              }`}
            >
              Romantic Dates
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark-cyan transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href={"/about-author"}
              className={`relative hover:text-dark-cyan transition-all duration-300 group ${
                pathname === "/about-author" ? "text-coral-pink" : ""
              }`}
            >
              About Author
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark-cyan transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* sign up and login button */}
          {/* desktop navigation links - hidden on mobile */}
          <div className="hidden md:block space-x-6 font-medium text-lg">
            <Link
              href={"/register"}
              className="text-dark-cyan hover:text-dark-blue transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </Link>
            <Link
              href={"/login"}
              className="bg-dark-cyan rounded-lg py-2 px-6 text-white hover:bg-dark-blue transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
          </div>

          {/* mobile hamburger button - visible only on mobile */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 relative z-60 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6 ">
              <HambergerMenu
                size="24"
                color="#183B4E"
                variant="Broken"
                className={`absolute transition-all duration-300 transform ${
                  isMobile
                    ? "rotate-90 opacity-0 scale-0"
                    : "rotate-0 opacity-100 scale-100"
                }`}
              />
              <X
                className={`w-6 h-6 absolute transition-all duration-300 transform ${
                  isMobile
                    ? "rotate-0 opacity-100 scale-100"
                    : "-rotate-90 opacity-0 scale-0"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobile ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMobile ? "opacity-50" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-500 ease-out ${
            isMobile
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Content */}
          <div className="flex flex-col p-6 space-y-6 mt-20 h-full">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-4">
              <Link
                href={"/romantic-date"}
                className={`text-lg font-medium hover:text-dark-cyan transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-50 transform hover:translate-x-2 ${
                  isMobile ? "animate-slideInRight" : ""
                }`}
                style={{ animationDelay: "100ms" }}
                onClick={closeMobileMenu}
              >
                Romantic Dates
              </Link>
              <Link
                href={"/about-author"}
                className={`text-lg font-medium hover:text-dark-cyan transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-50 transform hover:translate-x-2 ${
                  isMobile ? "animate-slideInRight" : ""
                }`}
                style={{ animationDelay: "200ms" }}
                onClick={closeMobileMenu}
              >
                About Author
              </Link>
            </div>

            {/* Divider */}
            <hr
              className={`border-gray-200 transition-all duration-500 ${
                isMobile ? "animate-slideInRight" : ""
              }`}
              style={{ animationDelay: "300ms" }}
            />

            {/* Auth Buttons */}
            <div className="flex flex-col space-y-4">
              <Link
                href={"/register"}
                className={`text-lg font-medium text-dark-cyan hover:text-dark-blue transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-50 transform hover:translate-x-2 ${
                  isMobile ? "animate-slideInRight" : ""
                }`}
                style={{ animationDelay: "400ms" }}
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
              <Link
                href={"/login"}
                className={`bg-dark-cyan rounded-lg py-3 px-6 text-white hover:bg-dark-blue transition-all duration-300 text-center text-lg font-medium transform hover:scale-105 hover:shadow-lg ${
                  isMobile ? "animate-slideInRight" : ""
                }`}
                style={{ animationDelay: "500ms" }}
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </div>

            {/* Decorative element */}
            <div
              className={`mt-auto pb-6 ${
                isMobile ? "animate-slideInRight" : ""
              }`}
              style={{ animationDelay: "600ms" }}
            >
              <div className="w-full h-1 bg-gradient-to-r from-dark-cyan to-dark-blue rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
