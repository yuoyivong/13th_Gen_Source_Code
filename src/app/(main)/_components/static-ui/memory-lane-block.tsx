import Image from "next/image";
import React from "react";

export default function MemoryLaneBlock() {
  return (
    <section className="flex gap-10 container mx-auto ">
      {/* first block */}
      <div className="w-[335px] h-[526px] relative hidden lg:block">
        <Image
          src={
            "https://i.pinimg.com/736x/0f/d5/f0/0fd5f03b661fceb3c9fd74eb6e52a3be.jpg"
          }
          fill
          alt="a boy at the beach"
          className="rounded-2xl object-cover"
        />
      </div>

      {/* second block */}
      <div className="flex flex-col gap-10 md:mx-auto">
        <div className="flex gap-10">
          {/* first image - a girl with a guitar */}
          <div className="w-[298px] h-[175px] relative">
            <Image
              src={
                "https://i.pinimg.com/736x/d9/c2/b6/d9c2b66a4442f89b3c2b9a3da8b3be31.jpg"
              }
              fill
              alt="sukoon the girl with guitar"
              className="rounded-2xl object-cover"
            />
          </div>

          {/* second image - a girl is sitting at the lake*/}
          <div className="w-[382px] h-[175px] relative">
            <Image
              src={
                "https://i.pinimg.com/736x/58/70/aa/5870aafc7478e7abc00cd303b6a11b8c.jpg"
              }
              fill
              alt="the girl is sitting"
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
        {/* a train landscape */}
        <div className="w-[719px] h-[310px] relative">
          <Image
            src={
              "https://i.pinimg.com/736x/75/40/83/7540836a8ee0e09bb177528b743f2670.jpg"
            }
            fill
            alt="a train landscape"
            className="rounded-2xl object-cover"
          />
        </div>
      </div>

      {/* third block */}
      <div className="hidden lg:flex flex-col gap-10">
        <div className="w-[422px] h-[324px] relative">
          <Image
            src={
              "https://i.pinimg.com/736x/45/40/d8/4540d8327e133412c35a0c7f93df76d1.jpg"
            }
            fill
            alt="the girl is sitting"
            className="rounded-2xl object-cover"
          />
        </div>
        <div className="w-[422px] h-[161px] relative">
          <Image
            src={
              "https://i.pinimg.com/736x/1e/2b/06/1e2b061f98eb26f5802b46b101ec7760.jpg"
            }
            fill
            alt="beautiful view"
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
