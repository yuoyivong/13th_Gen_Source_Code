import { ChevronRight } from "lucide-react";
import React from "react";

export default function WorkspaceTodoHeader() {
  return (
    <div className="flex gap-4 items-start text-lg">
      <h2>Workspace</h2>
      <ChevronRight size={20} className="mt-1" />
      <p className="text-royal-blue border-b border-b-royal-blue pb-1">
        HRD Design
      </p>
    </div>
  );
}
