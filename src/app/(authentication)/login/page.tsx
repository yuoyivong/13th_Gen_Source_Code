import React from "react";
import LoginComponent from "../_components/login-form";
import LogoComponent from "@/components/logo";

export default function LoginPage() {
  return (
    <>
      {/* welcome text */}
      <h1 className="text-dark-blue font-semibold flex gap-1 text-3xl justify-center">
        <span>Welcome to </span> <LogoComponent />
      </h1>
      <LoginComponent />
    </>
  );
}
