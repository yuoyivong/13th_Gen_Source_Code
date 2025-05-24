import React from "react";
import RegisterComponent from "../_components/register-form";
import LogoComponent from "@/components/logo";

export default function RegisterPage() {
  return (
    <>
      {/* welcome text */}
      <h1 className="text-dark-blue font-semibold flex gap-1 text-3xl justify-center">
        <span>Sign Up to </span> <LogoComponent />
      </h1>
      <RegisterComponent />
    </>
  );
}
