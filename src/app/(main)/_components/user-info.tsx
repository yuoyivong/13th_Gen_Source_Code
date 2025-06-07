"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/enum/gender";
import { cn } from "@/lib/utils";
import { userInfoSchema } from "@/schema/user-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileCircle, Sms, TextBlock, User } from "iconsax-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import LogoutPopup from "./popup/logout-popup";
import { UserInformation } from "@/types/model/user-information";
import { DEFAULT_IMAGE_URL } from "@/const/constant";
import { handleUploadFile } from "@/lib/upload-file-lib";
import { updateUserInfoAction } from "@/actions/user-action";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

export default function UserInfo({ user }: { user: UserInformation }) {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileImage, setFileImage] = useState<File | undefined>();

  // disable or enable input
  const [isEnable, setIsEnable] = useState(false);

  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
    reset,
  } = useForm<UserInformation>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      bio: user?.bio || "",
      gender: user?.gender || "",
    },
  });

  // function to handle form submission
  const handleFormSubmit = async (data: UserInformation) => {
    setLoading(true);

    try {
      // send the file to /file/upload-file endpoint
      let profile;
      if (fileImage) {
        profile = await handleUploadFile(fileImage);
      }

      // submission data
      const submissionData: UserInformation = {
        ...data,
        profileUrl: profile?.payload?.fileUrl || "",
      };

      // call the update user info action
      const response = await updateUserInfoAction(submissionData);

      if (response?.status === "OK") {
        setIsEnable(!isEnable);
        toast.success(response?.message || "Updated successfully.");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // handle choose profile picture
  const handleChooseProfile = () => {
    fileInputRef.current?.click();
  };

  // handle on file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setFileImage(file);
    }
  };

  // handle set to default profile
  const handleSetDefaultProfile = () => {
    setPreviewUrl(DEFAULT_IMAGE_URL);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // clear file input
    }
  };

  // handle enable or disable input fields
  const handleInputVisibility = () => {
    setIsEnable(!isEnable);
    reset();
  };

  return (
    <div className="w-full space-y-8 p-12 drop-shadow-steel-gray-xs bg-white rounded-4xl">
      {/* header */}
      <div className="flex justify-between items-center pb-3 border-b border-b-steel-gray/30">
        <h1 className="font-medium text-2xl">Personal Information</h1>

        {/* logout popup */}
        <LogoutPopup />
      </div>

      {/* personal information part */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="space-y-6">
          <div className="flex gap-8 items-end">
            {/* profile image */}
            <div className="relative w-64 h-64">
              <Image
                {...register("profileUrl")}
                src={previewUrl || user?.profileUrl || DEFAULT_IMAGE_URL}
                fill
                alt="Profile Image"
                className="rounded-full object-cover"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {/* set default image or choose another one */}
            <div className="space-x-4">
              <Button
                type="button"
                className="bg-dark-cyan hover:bg-dark-blue cursor-pointer"
                onClick={handleChooseProfile}
                disabled={!isEnable}
              >
                Choose Profile Picture
              </Button>
              <Button
                type="button"
                className="border border-dark-cyan bg-transparent text-dark-cyan hover:text-white hover:bg-dark-blue hover:border-dark-blue cursor-pointer"
                onClick={handleSetDefaultProfile}
                disabled={!isEnable}
              >
                Set Default Picture
              </Button>
            </div>
          </div>

          {/* additional information */}
          <div className="grid grid-cols-2 gap-8">
            {/* full name */}
            <div className="space-y-1.5">
              <div className="flex gap-1.5">
                <User size="20" color="#94A3B8" variant="Broken" />
                <Label
                  htmlFor="Full Name"
                  className="text-right text-steel-gray text-md font-normal"
                >
                  Full Name
                </Label>
              </div>

              <Input
                {...register("fullName")}
                type="text"
                placeholder="Please enter your full name"
                className={`${
                  errors?.fullName
                    ? "focus:outline focus:outline-red-600 border border-red-600"
                    : "border-0"
                } bg-white-smoke placeholder:text-gray-300 py-5 px-4 capitalize`}
                disabled={!isEnable}
              />

              {/* show error on location field */}
              {errors?.fullName && (
                <p className="text-red-600 text-sm mt-2">
                  {errors?.fullName?.message}
                </p>
              )}
            </div>

            {/* gender */}
            <div className="space-y-1.5">
              <div className="flex gap-1.5">
                <ProfileCircle size="20" color="#94A3B8" variant="Broken" />
                <Label
                  htmlFor="gender"
                  className="text-right text-steel-gray text-md font-normal"
                >
                  Gender
                </Label>
              </div>

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Trigger validation to ensure the form state updates
                      trigger("gender");
                    }}
                    value={field.value}
                    disabled={!isEnable}
                  >
                    <SelectTrigger
                      className={cn(
                        "bg-white-smoke data-[placeholder]:text-gray-300 w-full py-5 border-0",
                        errors?.gender &&
                          "bg-white-smoke focus:outline focus:outline-red-600 border border-red-600"
                      )}
                    >
                      <SelectValue placeholder="Please choose your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">{Gender.Male}</SelectItem>
                      <SelectItem value="FEMALE">{Gender.Female}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {/* show error on location field */}
              {errors?.gender && (
                <p className="text-red-600 text-sm mt-2">
                  {errors?.gender?.message}
                </p>
              )}
            </div>

            {/* email - always disable */}
            <div className="space-y-1.5">
              <div className="flex gap-1.5">
                <Sms size="20" color="#94A3B8" variant="Broken" />
                <Label
                  htmlFor="email"
                  className="text-right text-steel-gray text-md font-normal"
                >
                  Email Address
                </Label>
              </div>

              <Input
                type="email"
                value={user?.email}
                className={`bg-white-smoke placeholder:text-gray-300 py-5 px-4 border-0`}
                disabled
              />
            </div>

            {/* bio */}
            <div className="space-y-1.5">
              <div className="flex gap-1.5">
                <TextBlock size="20" color="#94A3B8" variant="Broken" />
                <Label
                  htmlFor="bio"
                  className="text-right text-steel-gray text-md font-normal"
                >
                  Bio (optional)
                </Label>
              </div>

              <Input
                {...register("bio")}
                type="text"
                placeholder="Please enter your bio"
                className={`bg-white-smoke placeholder:text-gray-300 py-5 px-4 border-0`}
                disabled={!isEnable}
              />
            </div>
          </div>
        </div>

        {/* button */}
        <div className="text-right pt-8">
          {!isEnable ? (
            <Button
              type="button"
              className="bg-dark-blue px-8 text-base cursor-pointer"
              onClick={handleInputVisibility}
            >
              Edit
            </Button>
          ) : (
            <div className="space-x-4">
              <Button
                type="button"
                className="text-dark-blue bg-transparent border border-dark-blue px-8 text-base cursor-pointer hover:text-white hover:bg-dark-blue"
                onClick={handleInputVisibility}
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                type="submit"
                className="bg-dark-blue px-8 text-base cursor-pointer"
              >
                {loading ? (
                  <p className="flex items-center gap-2">
                    <LoaderIcon />
                    <span>Saving ...</span>
                  </p>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
