import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Eye } from "iconsax-react";
import React from "react";
import MemoryPopup from "../popup/memory-popup";
import DeletePopup from "../popup/delete-popup";
import Link from "next/link";

export default function ActionCell({ itemId }: { itemId: number | undefined }) {
  console.log("ActionCell itemId: ", itemId);

  return (
    <TableCell className="font-light py-3 space-x-3 text-center w-1/6">
      <Button className="bg-orange-peel/20 text-orange-peel hover:bg-orange-peel/30">
        <Link
          href={`/memory-details/${itemId}`}
          className="flex gap-2 items-center"
        >
          <Eye size="14" color="#FF9F00" variant="Broken" /> View
        </Link>
      </Button>
      <MemoryPopup type="edit" id={itemId} />
      {/* popup delete */}
      <DeletePopup ids={itemId !== undefined ? [itemId] : []} />
    </TableCell>
  );
}
