import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Ellipsis } from "lucide-react";
import React from "react";

export default function CardComponent() {
  return (
    <div className="border border-gray-300 rounded-xl mt-8">
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Slack Integration</h2>
          <Ellipsis />
        </div>

        {/* task detials */}
        <p className="line-clamp-2 text-light-steel-blue my-2 h-12">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde magnam
          quibusdam molestias deleniti vero. Accusamus ut sapiente doloribus
          sunt, odit dolorem eos deserunt! Aliquam est provident beatae
          repudiandae voluptates id.
        </p>

        <div className="flex justify-between items-center mt-4">
          {/* tag */}
          <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">
            Development
          </p>

          {/* status */}
          <div className={`rounded-full w-8 h-8 bg-watermelon-red`}></div>
        </div>
      </div>

      {/* progress */}
      <div className="flex justify-between items-center border-t border-t-gray-300 p-5">
        <Select>
          <SelectTrigger className="w-32 truncate border-watermelon-red text-watermelon-red">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        {/* date */}
        <p className="flex gap-3 text-light-steel-blue">
          <Clock size={22} /> Mar 23, 2025
        </p>
      </div>
    </div>
  );
}
