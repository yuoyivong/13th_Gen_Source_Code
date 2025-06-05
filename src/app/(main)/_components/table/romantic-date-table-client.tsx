"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import DeletePopup from "../popup/delete-popup";
import formattedDate from "@/lib/format-date";
import { ROMANTIC_DATE_COLUMNS } from "./romantic-date-columns";
import { cn } from "@/lib/utils";
import ActionCell from "./action-cell";
import StatusCell from "./status-cell";
import SelectedCheckbox from "./selected-checkbox";
import { APIResponse } from "@/types/response/api-response";
import { RomanticDate } from "@/types/model/romantic-date";

export default function RomanticDateTableClient({
  dataList,
  allIds,
}: {
  dataList: APIResponse<RomanticDate[]>;
  allIds: number[];
}) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isHide, setIsHide] = useState<boolean>(false);

  // truncate text function
  const truncateText = (text: string, maxLength = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    if (selectedRows?.length > 0) {
      setIsHide(true);
    } else {
      setIsHide(false);
    }
    console.log("SElected : ", selectedRows);
  }, [selectedRows]);

  return (
    <>
      <div className="h-4">
        {isHide ? (
          <DeletePopup
            ids={
              selectedRows?.length === allIds?.length ? allIds : selectedRows
            }
            label={
              selectedRows.length === allIds.length
                ? "All"
                : `Selected ${selectedRows?.length} Row${
                    selectedRows.length > 1 ? "s" : ""
                  }`
            }
            onDeleted={() => setSelectedRows([])}
          />
        ) : null}
      </div>
      <Table>
        <TableCaption>
          A list of our romantic dates that are worth to plan.
        </TableCaption>

        {/* Define column widths */}
        <colgroup>
          {ROMANTIC_DATE_COLUMNS.map(({ id, width }) => (
            <col key={id} className={width} />
          ))}
        </colgroup>

        {/* table header */}
        <TableHeader className="bg-white-smoke w-full text-center">
          <TableRow>
            {ROMANTIC_DATE_COLUMNS.map(({ id, label, align }, index) => (
              <TableHead
                key={id}
                className={cn(
                  "text-dark-blue text-base font-normal",
                  align === "center" && "text-center",
                  index === 0 && "rounded-tl-lg pl-8",
                  index === ROMANTIC_DATE_COLUMNS.length - 1 && "rounded-tr-lg"
                )}
              >
                {id === "checkbox" ? (
                  <SelectedCheckbox
                    isHeader={true}
                    allIds={allIds}
                    onSelectionChange={setSelectedRows}
                    selectedRows={selectedRows}
                  />
                ) : (
                  label
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataList?.payload?.map((item, index) => (
            <TableRow
              key={item?.id}
              className="odd:bg-white even:bg-white-smoke"
            >
              <TableCell className="pl-8">
                <SelectedCheckbox
                  itemId={item?.id}
                  allIds={allIds}
                  onSelectionChange={setSelectedRows}
                  selectedRows={selectedRows}
                />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="truncate">
                {truncateText(item?.location)}
              </TableCell>
              <TableCell>{formattedDate(item?.date)}</TableCell>
              <TableCell className="truncate">
                {truncateText(item?.details)}
              </TableCell>
              <StatusCell status={item?.status} />
              <ActionCell itemId={item?.id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
