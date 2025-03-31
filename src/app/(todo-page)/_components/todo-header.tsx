import { ChevronRight } from "lucide-react";
import React from "react";
import WorkspaceTodoHeader from "./workspace-todo-header";
import UserProfile from "./user-profile";

export default function TodoHeader() {
  return (
    <div className="flex justify-between items-center border-b border-b-gray-300 py-4 px-10">
      <WorkspaceTodoHeader />
      <UserProfile />
    </div>
  );
}
