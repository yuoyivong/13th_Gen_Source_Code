import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash } from "iconsax-react";
import Link from "next/link";
import React from "react";
import MemoryPopup from "../popup/memory-popup";
import DeletePopup from "../popup/delete-popup";
import { Checkbox } from "@/components/ui/checkbox";

export default function RomanticDateTable() {
  return (
    <Table>
      <TableCaption>
        A list of our romantic dates that are worth to plan.
      </TableCaption>
      <TableHeader className="bg-white-smoke w-full text-center">
        <TableRow>
          <TableHead className="pl-8 text-dark-blue text-base rounded-tl-lg font-normal w-1/12">
            <Checkbox />
          </TableHead>
          <TableHead className="text-dark-blue text-base font-normal w-1/10">
            No
          </TableHead>
          <TableHead className="w-1/5 text-dark-blue text-base font-normal">
            Where we are going
          </TableHead>
          <TableHead className="w-1/8 text-dark-blue text-base font-normal">
            Date
          </TableHead>
          <TableHead className="w-1/5 text-dark-blue text-base font-normal ">
            What we plan to do
          </TableHead>
          <TableHead className="w-1/8 text-dark-blue text-base font-normal text-center">
            Status
          </TableHead>
          <TableHead className="w-1/6 text-dark-blue text-base rounded-tr-lg font-normal text-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="odd:bg-white even:bg-white-smoke w-full">
          <TableCell className="pl-8 font-light py-3">
            <Checkbox />{" "}
          </TableCell>
          <TableCell className="font-light py-3">001</TableCell>
          <TableCell className="font-light py-3">Paris</TableCell>
          <TableCell className="font-light py-3">15 Jan, 2027</TableCell>
          <TableCell className="font-light py-3">
            Visit the Eiffel Tower
          </TableCell>
          <TableCell className="font-normal py-3 text-center">
            <span className="bg-white drop-shadow-steel-gray-xs py-2 px-4 rounded-full text-orange-peel">
              ongoing
            </span>
          </TableCell>
          <TableCell className="font-light py-3 space-x-3 text-center">
            <Button className="bg-orange-peel/20 text-orange-peel hover:bg-orange-peel/30">
              <Link
                href={"/memory-details/1"}
                className="flex gap-2 items-center"
              >
                <Eye size="14" color="#FF9F00" variant="Broken" /> View
              </Link>
            </Button>
            <MemoryPopup type="edit" />
            {/* popup delete */}
            <DeletePopup />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
