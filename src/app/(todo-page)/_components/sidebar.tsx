import { Ellipsis, LogOut, SquarePlus, Star } from "lucide-react";
import React from "react";

export default function SidebarComponent() {
  return (
    <aside className="space-y-6 sticky top-0">
      {/* workspace */}
      <div className="h-72 overflow-y-auto">
        <h2 className="flex gap-2 items-center text-xl text-light-steel-blue justify-between mx-6">
          Workspace <SquarePlus size={20} />
        </h2>

        <div className="flex justify-between items-center my-2 bg-light-steel-blue/5 py-3 px-5 w-full rounded-lg ">
          <div className="flex gap-3 items-center">
            <div className="bg-watermelon-red w-2 h-2 rounded-full"></div>
            <p className="font-semibold">HRD Design</p>
          </div>

          <Ellipsis />
        </div>
      </div>

      {/* favorite workspace */}
      <div className="h-72 overflow-y-auto">
        <h2 className="flex gap-2 items-center text-xl text-light-steel-blue justify-between mx-6">
          Favorite <Star size={20} />
        </h2>

        <div className="flex justify-between items-center my-2 bg-light-steel-blue/5 py-3 px-5 w-full rounded-lg ">
          <div className="flex gap-3 items-center">
            <div className="bg-watermelon-red w-2 h-2 rounded-full"></div>
            <p className="font-semibold">HRD Design</p>
          </div>

          <Ellipsis />
        </div>
      </div>

      <p className="mx-6 flex gap-2 items-center text-xl text-light-steel-blue ">
        <LogOut /> Logout
      </p>
    </aside>
  );
}
