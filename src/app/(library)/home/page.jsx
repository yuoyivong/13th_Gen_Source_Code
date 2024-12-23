import React from "react";
import BookComponent from "../components/BookComponent";
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";
import { auth } from "@/auth";

export default async function Homepage() {
  // get session from auth
  const session = await auth();

  return (
    <>
      {/* navbar */}
      <NavbarComponent session={session} />

      {/* book list */}
      <div className="bg-homepage-header h-[613px] bg-right bg-no-repeat">
        <div className="container mx-auto pt-44">
          {/* right size content */}
          <h1 className="uppercase text-[75px] font-bold">
            read and add <br />
            your insight
          </h1>

          {/* description */}
          <p className="capitalize text-2xl">
            find your favorite book and read it here for free
          </p>
        </div>
      </div>

      {/* book list */}
      <div className="max-h-auto bg-gray-100 py-14 ">
        <BookComponent content={"These are new stories"} />
      </div>

      {/* footer */}
      <FooterComponent />
    </>
  );
}
