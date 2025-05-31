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
import { Edit, Eye, Trash } from "iconsax-react";
import Link from "next/link";
import React from "react";

export default function RomanticDateTable() {
  return (
    <Table>
      <TableCaption>
        A list of our romantic dates that are worth to plan.
      </TableCaption>
      <TableHeader className="bg-white-smoke w-full text-center">
        <TableRow>
          <TableHead className="pl-8 text-dark-blue text-center text-base rounded-tl-lg font-normal">
            No
          </TableHead>
          <TableHead className="text-dark-blue text-base font-normal text-center">
            Where we are going
          </TableHead>
          <TableHead className="text-dark-blue text-base font-normal text-center">
            Date
          </TableHead>
          <TableHead className="text-dark-blue text-base font-normal text-center">
            What we plan to do
          </TableHead>
          <TableHead className="text-dark-blue text-base font-normal text-center">
            Status
          </TableHead>
          <TableHead className="text-dark-blue text-base rounded-tr-lg font-normal text-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="odd:bg-white even:bg-white-smoke w-full text-center">
          <TableCell className="pl-8 font-light py-3">001</TableCell>
          <TableCell className="font-light py-3">Paris</TableCell>
          <TableCell className="font-light py-3">15 Jan, 2027</TableCell>
          <TableCell className="font-light py-3">
            Visit the Eiffel Tower
          </TableCell>
          <TableCell className="font-normal py-3">
            <span className="bg-white drop-shadow-steel-gray-xs py-2 px-4 rounded-full text-orange-peel">
              ongoing
            </span>
          </TableCell>
          <TableCell className="font-light py-3 space-x-3">
            <Button className="bg-orange-peel/20 text-orange-peel hover:bg-orange-peel/30">
              <Link
                href={"/memory-details/1"}
                className="flex gap-2 items-center"
              >
                <Eye size="14" color="#FF9F00" variant="Broken" /> View
              </Link>
            </Button>
            {/* popup edit */}
            <Button className="bg-dark-cyan/20 text-dark-cyan hover:bg-dark-cyan/30">
              <Edit size="14" color="#309898" variant="Broken" /> Edit
            </Button>
            {/* popup delete */}
            <Button className="bg-crimson-red/20 text-crimson-red hover:bg-crimson-red/30">
              <Trash size="14" color="#CB0404" variant="Broken" /> Delete
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
