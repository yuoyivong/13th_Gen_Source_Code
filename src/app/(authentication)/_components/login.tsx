"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { loginAction } from "@/actions/auth-action";
import { Key, Sms } from "iconsax-react";

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  //   handle form submit
  const handleFormSubmit = async (data: any) => {
    console.log(data);
    await loginAction(data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* email */}
      <div>
        <Label
          htmlFor="email"
          className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
        >
          <Sms size="20" color="#94A3B8" variant="Broken" /> Email
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
          <Key size="20" color="#94a3b8" variant="Broken" /> Password
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
      <Button
        type="submit"
        className="text-base cursor-pointer bg-persian-green text-white py-2.5 rounded-lg w-full font-bold"
      >
        Login
      </Button>

      {/* underline */}
      <div>
        <div className="border-b border-b-light-steel-blue"></div>
        <div className="capitalize text-right mt-2 font-normal">
          create new accont?{" "}
          <Link
            href={"/register"}
            className="hover:text-persian-green hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* sign in with google */}
      <div className=" bg-ghost-white rounded-lg text-center">
        <Button className="flex gap-2 items-start justify-center w-full bg-ghost-white text-charcoal shadow-none hover:bg-ghost-white/50">
          <img src="/Google Icon.svg" alt="google icon" /> Login with google
        </Button>
      </div>
    </form>
  );
}
