import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "@/enum/status";
import { TaskType } from "@/interface/task-type";
import formattedDate from "@/lib/format-date";
import { Clock, Ellipsis } from "lucide-react";
import React from "react";

export default function CardComponent({ task }: { task: TaskType }) {
  return (
    <div className="border border-gray-300 rounded-xl mt-8">
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold capitalize">{task?.taskTitle}</h2>
          <Ellipsis />
        </div>

        {/* task detials */}
        <p className="line-clamp-2 text-light-steel-blue my-2 h-12">
          {task?.taskDetails}
        </p>

        <div className="flex justify-between items-center mt-4">
          {/* tag */}
          <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">
            {task?.tag}
          </p>

          {/* status */}
          <div
            className={`rounded-full w-8 h-8 ${
              task?.status === Status.NOT_STARTED
                ? "bg-watermelon-red"
                : task?.status === Status.IN_PROGRESS
                ? "bg-royal-blue"
                : "bg-persian-green"
            }`}
          ></div>
        </div>
      </div>

      {/* progress */}
      <div className="flex justify-between items-center border-t border-t-gray-300 p-5">
        <Select>
          <SelectTrigger
            className={`w-36 truncate ${
              task?.status === Status.NOT_STARTED
                ? "border-watermelon-red text-watermelon-red "
                : task?.status === Status.IN_PROGRESS
                ? "border-royal-blue text-royal-blue "
                : "border-persian-green text-persian-green "
            }`}
          >
            <SelectValue placeholder={task?.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NOT_STARTED">{Status.NOT_STARTED}</SelectItem>
            <SelectItem value="IN_PROGRESS">{Status.IN_PROGRESS}</SelectItem>
            <SelectItem value="FINISHED">{Status.FINISHED}</SelectItem>
          </SelectContent>
        </Select>

        {/* date */}
        <p className="flex gap-3 text-light-steel-blue">
          <Clock size={22} /> {formattedDate(task?.endDate || new Date())}
        </p>
      </div>
    </div>
  );
}
