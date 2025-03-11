import React from "react";
import CartoonCardComponent from "../_components/CartoonCardComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Old School Cartoons",
};

export default function OldSchoolCartoonPage() {
  return (
    <div>
      <CartoonCardComponent />
    </div>
  );
}
