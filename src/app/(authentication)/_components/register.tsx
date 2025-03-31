"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { schema } from "@/schema/form-schema";
import { User } from "@/interface/user-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function RegisterComponent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  //   handle form submit
  const handleFormSubmit = (data: User) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* username */}
      <div>
        <Label
          htmlFor="username"
          className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
        >
          <UserRound size={20} /> Username
        </Label>

        <Input
          {...register("username")}
          type="text"
          placeholder="Please type your username"
          className={`${
            errors?.username
              ? "focus:outline focus:outline-red-600 border border-red-600"
              : ""
          } bg-ghost-white py-2.5 px-4 rounded-lg w-full text-light-steel-blue/90`}
        />

        {errors?.username && (
          <p className="text-red-600 text-sm mt-2">
            {errors?.username?.message}
          </p>
        )}
      </div>

      {/* email */}
      <div>
        <Label
          htmlFor="email"
          className="text-light-steel-blue flex gap-2 items-start mb-2  text-base"
        >
          <Mail size={20} /> Email
        </Label>

        <Input
          {...register("email")}
          type="text"
          placeholder="Please type your email"
          className={`${
            errors?.email
              ? "focus:outline focus:outline-red-600 border border-red-600"
              : ""
          } bg-ghost-white py-2.5 px-4 rounded-lg w-full text-light-steel-blue/90`}
        />

        {errors?.email && (
          <p className="text-red-600 text-sm mt-2">{errors?.email?.message}</p>
        )}
      </div>

      {/* password */}
      <div>
        <Label
          htmlFor="password"
          className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
        >
          <KeyRound size={20} /> Password
        </Label>

        <Input
          {...register("password")}
          type="password"
          placeholder="Please type your password"
          className={`${
            errors?.password
              ? "focus:outline focus:outline-red-600 border border-red-600"
              : ""
          } bg-ghost-white py-2.5 px-4 rounded-lg w-full text-light-steel-blue/90`}
        />

        {errors?.password && (
          <p className="text-red-600 text-sm mt-2">
            {errors?.password?.message}
          </p>
        )}
      </div>

      {/* sign in button */}
      <Button className="text-base cursor-pointer bg-persian-green text-white py-2.5 rounded-lg w-full font-bold">
        Sign Up{" "}
      </Button>

      {/* underline */}
      <div>
        <div className="border-b border-b-light-steel-blue"></div>
        <div className="text-right mt-2 font-normal">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="hover:text-persian-green hover:underline"
          >
            Login
          </Link>
        </div>
      </div>

      {/* sign in with google */}
      <div className=" bg-ghost-white rounded-lg text-center">
        <Button className="flex gap-2 items-start justify-center w-full bg-ghost-white text-charcoal shadow-none hover:bg-ghost-white/50">
          <img src="/Google Icon.svg" alt="google icon" /> Sign in with google
        </Button>
      </div>
    </form>
  );
}
