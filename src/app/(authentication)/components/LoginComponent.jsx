"use client";
import { signIn } from "next-auth/react";
import { Button, Form, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginComponent() {
  const [isHide, setIsHide] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = (e) => {
    // prevent page for full reload
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Submit data to your backend API.
    setSubmitted(data);
    signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirectTo: "/home",
    });
  };

  return (
    <Form onSubmit={handleSubmit} validationBehavior="native">
      <div className="w-2/3 gap-4 mx-auto py-8 space-y-5">
        <Input
          name="email"
          label="Email"
          type="email"
          isRequired
          errorMessage="Email cannot be empty."
        />

        <div className="relative">
          <Input
            name="password"
            label="Password"
            type={!isHide ? "password" : "text"}
            isRequired
            errorMessage="Password cannot be empty."
          />

          {!isHide ? (
            <Eye
              className="absolute top-4 right-3 text-gray-400 cursor-pointer"
              onClick={() => setIsHide(!isHide)}
            />
          ) : (
            <EyeOff
              className="absolute top-4 right-3 text-gray-400 cursor-pointer"
              onClick={() => setIsHide(!isHide)}
            />
          )}
        </div>

        {/* submit login form button */}
        <Button
          //   isDisabled={submitted ? true : false}
          type="submit"
          className="bg-blue-800 text-white w-full text-base font-bold h-12 rounded-full"
        >
          Login
        </Button>

        {/* already have an account */}
        <div className="text-right hover:underline">
          <Link href="/signUp" className="text-gray-400">
            Create New Account
          </Link>
        </div>
      </div>
    </Form>
  );
}
