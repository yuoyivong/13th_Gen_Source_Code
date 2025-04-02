import { logoutAction } from "@/actions/logout-action";
import { Button } from "@/components/ui/button";
import { LogoutCurve } from "iconsax-react";
import React from "react";

export default function LogoutComponent() {
  return (
    <form action={logoutAction}>
      <div className="w-full hover:bg-persian-green/10 p-1.5 rounded-r-lg">
        <Button
          className="bg-transparent shadow-none hover:bg-transparent
      "
        >
          <p className=" mx-6 flex gap-2 items-center text-xl text-persian-green  ">
            <LogoutCurve size="20" color="#009990" variant="Broken" /> Logout
          </p>
        </Button>
      </div>
    </form>
  );
}
