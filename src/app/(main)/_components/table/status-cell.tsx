import { TableCell } from "@/components/ui/table";
import { PlanStatus } from "@/enum/status";
import { cn } from "@/lib/utils";
import React from "react";

export default function StatusCell({ status }: { status: string | undefined }) {
  // function to return status value
  const handleStatusValue = (status: string | undefined) => {
    const statusStyle = {
      statusPlan: "",
      textColor: "",
    };
    if (status === "PENDING") {
      statusStyle.statusPlan = PlanStatus.pending;
      statusStyle.textColor = "text-coral-pink";
      return statusStyle;
    } else if (status === "ONGOING") {
      statusStyle.statusPlan = PlanStatus.ongoing;
      statusStyle.textColor = "text-orange-peel";
      return statusStyle;
    } else if (status === "COMPLETED") {
      statusStyle.statusPlan = PlanStatus.completed;
      statusStyle.textColor = "text-dark-cyan";
      return statusStyle;
    } else {
      statusStyle.statusPlan = "DEFAULT";
      statusStyle.textColor = "text-dark-blue";
      return statusStyle;
    }
  };

  // extract text color and status plan
  const { statusPlan, textColor } = handleStatusValue(status);
  return (
    <TableCell className="text-center">
      <span
        className={cn(
          "bg-white drop-shadow-steel-gray-xs py-2 px-4 rounded-full",
          textColor
        )}
      >
        {statusPlan}
      </span>
    </TableCell>
  );
}
