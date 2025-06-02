"use client";
import { loginAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/schema/auth-schema";
import { UserCredentails } from "@/types/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash, Key, Sms } from "iconsax-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginComponent() {
  // state to manage whether to see the password or not
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // handle submit form login
  const handleFormSubmit = async (data: UserCredentails) => {
    console.log("User logs in : ", data);
    await loginAction(data);

    reset();
  };

  // password visibility
  const handlePasswordVisibilityChange = () => {
    setShowPassword(!showPassword);
  };

  // check password field
  const paswordValue = watch("password");
  // auto change password input field to password
  useEffect(() => {
    setShowPassword(false);
  }, [!paswordValue]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10">
      {/* email */}
      <div>
        <Label
          htmlFor="email"
          className="text-steel-gray flex gap-2 items-start mb-2 text-base font-normal"
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
              : "border-0"
          } bg-white-smoke py-5 px-4 rounded-lg w-full placeholder:text-gray-300`}
        />

        {errors?.email && (
          <p className="text-red-600 text-sm mt-2">{errors?.email?.message}</p>
        )}
      </div>

      {/* password */}
      <div>
        <Label
          htmlFor="password"
          className="text-steel-gray flex gap-2 items-start mb-2 text-base font-normal"
        >
          <Key size="20" color="#94a3b8" variant="Broken" /> Password
        </Label>

        <div className="relative">
          <Input
            {...register("password")}
            type={!showPassword ? "password" : "text"}
            placeholder="Please type your password"
            className={`${
              errors?.password
                ? "focus:outline focus:outline-red-600 border border-red-600"
                : "border-0"
            } bg-white-smoke py-5 px-4 rounded-lg w-full placeholder:text-gray-300`}
          />

          {/* eye icon */}

          {showPassword ? (
            <EyeSlash
              size="24"
              color="#94A3B8"
              variant="Broken"
              className={`${
                paswordValue ? "block" : "hidden"
              } absolute top-2 right-3`}
              onClick={handlePasswordVisibilityChange}
            />
          ) : (
            <Eye
              size="24"
              color="#94A3B8"
              variant="Broken"
              className={`${
                paswordValue ? "block" : "hidden"
              } absolute top-2 right-3`}
              onClick={handlePasswordVisibilityChange}
            />
          )}
        </div>

        {errors?.password && (
          <p className="text-red-600 text-sm mt-2">
            {errors?.password?.message}
          </p>
        )}
      </div>

      {/* sign in button */}
      <Button
        type="submit"
        className="text-base cursor-pointer bg-dark-cyan text-white py-5 rounded-lg w-full font-bold hover:bg-dark-blue"
      >
        Login
      </Button>

      {/* underline */}
      <div>
        <div className="border-b border-b-steel-gray/50"></div>
        <div className="text-right mt-2 font-normal">
          Haven't had an account yet?{" "}
          <Link
            href={"/register"}
            className="hover:text-dark-cyan hover:underline font-medium text-dark-cyan"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
}
