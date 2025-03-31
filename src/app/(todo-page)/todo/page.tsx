import { Star } from "lucide-react";
import React from "react";
import CardComponent from "../_components/card";
import AddNewTaskPopup from "../_components/add-new-task";

export default function TodoPage() {
  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">HRD Design</h1>

        <div className="p-2 rounded-lg bg-light-steel-blue/20">
          <Star />
        </div>
      </div>

      {/* status header */}
      <div className="grid grid-cols-3 mt-6 gap-44">
        {/* not started */}
        <div className="col-span-1">
          <p className="text-lg capitalize text-watermelon-red pb-1 border-b border-b-watermelon-red ">
            not started
          </p>
          <CardComponent />
        </div>

        {/* in progress */}
        <div className="col-span-1">
          <p className="text-lg capitalize text-royal-blue pb-1 border-b border-b-royal-blue">
            in progress
          </p>
          <CardComponent />
        </div>

        {/* finished */}
        <div className="col-span-1 ">
          <p className="text-lg capitalize text-persian-green pb-1 border-b border-b-persian-green">
            finished
          </p>
          <CardComponent />
        </div>
      </div>

      {/* add new task popup button */}
      <div className="fixed bottom-10 right-10 flex gap-4 items-center">
        <AddNewTaskPopup />

        <div className="bg-white p-3 rounded-full">
          <img src="/4 dots.svg" alt="4 dots" />
        </div>
      </div>
    </div>
  );
}
