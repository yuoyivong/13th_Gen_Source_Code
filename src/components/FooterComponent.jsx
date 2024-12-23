import { Copyright } from "lucide-react";
import React from "react";

export default function FooterComponent() {
  return (
    <footer className="bg-primary text-white flex gap-3 p-3 justify-center items-center">
      <Copyright size={20} /> Copyright 2023{" "}
      <span>
        MY<span className="font-bold">BOOK</span>
      </span>
      | <span className="uppercase font-semibold">kao seavpinh</span>
    </footer>
  );
}
