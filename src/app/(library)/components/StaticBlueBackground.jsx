"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function StaticBlueBackground() {
  const router = useRouter();
  return (
    <div className="bg-book-by-id-page h-[550px] bg-cover bg-no-repeat">
      <div className="container mx-auto py-16">
        <ArrowLeft
          size={60}
          color="#FFFFFF"
          onClick={() => router.back()}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
