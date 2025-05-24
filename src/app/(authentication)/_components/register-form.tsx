"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema } from "@/schema/auth-schema";
import { UserRegistration } from "@/types/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash, Key, Sms, User } from "iconsax-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterComponent() {
  // state to manage whether to see the password or not
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // state to manage the confirm password field
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  // handle submit form login
  const handleFormSubmit = (data: UserRegistration) => {
    console.log("User registers : ", data);
  };

  // password visibility
  const handlePasswordVisibilityChange = () => {
    setShowPassword(!showPassword);
  };

  // confirm password visibility
  const handleConfirmPasswordVisibilityChange = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // check password value
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  // auto change password input field to password
  useEffect(() => {
    if (!passwordValue) {
      setShowPassword(false);
    }

    if (!confirmPasswordValue) {
      setShowConfirmPassword(false);
    }
  }, [!passwordValue, !confirmPasswordValue]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* full name */}
      <div>
        <Label
          htmlFor="fullName"
          className="text-steel-gray flex gap-2 items-start mb-2 text-base font-normal"
        >
          <User size="20" color="#94A3B8" variant="Broken" /> Full Name
        </Label>

        <Input
          {...register("fullName")}
          type="text"
          placeholder="Please type your full name"
          className={`${
            errors?.fullName
              ? "focus:outline focus:outline-red-600 border border-red-600"
              : "border-0"
          } bg-white-smoke py-5 px-4 rounded-lg w-full placeholder:text-gray-300`}
        />

        {errors?.fullName && (
          <p className="text-red-600 text-sm mt-2">
            {errors?.fullName?.message}
          </p>
        )}
      </div>

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
                passwordValue ? "block" : "hidden"
              } absolute top-2 right-3`}
              onClick={handlePasswordVisibilityChange}
            />
          ) : (
            <Eye
              size="24"
              color="#94A3B8"
              variant="Broken"
              className={`${
                passwordValue ? "block" : "hidden"
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

      {/* confirm password */}
      <div>
        <Label
          htmlFor="confirmPassword"
          className="text-steel-gray flex gap-2 items-start mb-2 text-base font-normal"
        >
          <Key size="20" color="#94a3b8" variant="Broken" /> Confirm Password
        </Label>

        <div className="relative">
          <Input
            {...register("confirmPassword")}
            type={!showConfirmPassword ? "password" : "text"}
            placeholder="Please type your confirm password"
            className={`${
              errors?.confirmPassword
                ? "focus:outline focus:outline-red-600 border border-red-600"
                : "border-0"
            } bg-white-smoke py-5 px-4 rounded-lg w-full placeholder:text-gray-300`}
          />

          {/* eye icon */}

          {showConfirmPassword ? (
            <EyeSlash
              size="24"
              color="#94A3B8"
              variant="Broken"
              className={`${
                confirmPasswordValue ? "block" : "hidden"
              } absolute top-2 right-3`}
              onClick={handleConfirmPasswordVisibilityChange}
            />
          ) : (
            <Eye
              size="24"
              color="#94A3B8"
              variant="Broken"
              className={`${
                confirmPasswordValue ? "block" : "hidden"
              } absolute top-2 right-3`}
              onClick={handleConfirmPasswordVisibilityChange}
            />
          )}
        </div>

        {errors?.confirmPassword && (
          <p className="text-red-600 text-sm mt-2">
            {errors?.confirmPassword?.message}
          </p>
        )}
      </div>

      {/* sign up button */}
      <Button
        type="submit"
        className="text-base cursor-pointer bg-dark-cyan text-white py-5 rounded-lg w-full font-bold hover:bg-dark-blue"
      >
        Sign Up
      </Button>

      {/* underline */}
      <div>
        <div className="border-b border-b-steel-gray/50"></div>
        <div className="text-right mt-2 font-normal">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="hover:text-dark-cyan hover:underline font-medium text-dark-cyan"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
