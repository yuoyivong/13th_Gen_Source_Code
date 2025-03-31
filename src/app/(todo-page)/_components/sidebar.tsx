import { SquarePlus, Star } from "lucide-react";
import React from "react";

export default function SidebarComponent() {

  return (
    <aside className="space-y-6 mx-6">
      {/* workspace */}
      <p className="flex gap-2 items-center text-xl text-light-steel-blue justify-between">
        Workspace <SquarePlus size={20} />
      </p>

      {/* favorite workspace */}
      <p className="flex gap-2 items-center text-xl text-light-steel-blue justify-between">
        Favorite <Star size={20} />
      </p>
    </aside>
  );
}
