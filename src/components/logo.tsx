import Link from "next/link";
import React from "react";

export default function LogoComponent() {
  return (
    <Link href={"/"} className="font-semibold text-dark-blue">
      MY<span className="text-coral-pink">GAL</span>LER
      <span className="text-orange-peel">Y</span>
    </Link>
  );
}
