import Image from "next/image";
import React from "react";

export default function layout({ children }) {
  return (
    <div className=" flex border border-gray-300 h-auto items-center justify-center my-32 mx-44 rounded-2xl">
      <main className={` w-1/2 p-12 bg-primary text-white rounded-l-2xl`}>
        <p className="uppercase text-3xl">
          my<span className="font-bold">book</span>
        </p>

        <div className="flex flex-col items-center py-24">
          <Image
            src={"/images/Artboard.svg"}
            alt="artboard image"
            width={295}
            height={295}
          />
          <p className="text-2xl">
            Welcome to{" "}
            <span className="uppercase">
              my<span className="font-bold">book</span>
            </span>
          </p>
          <p>There is no friend as loyal as a book.</p>
        </div>
      </main>
      <div className="w-1/2">
        <Image
          src={"/images/Welcome.svg"}
          width={264}
          height={124}
          alt="welcome image"
          className="mx-auto"
        />
        {children}
      </div>
    </div>
  );
}
