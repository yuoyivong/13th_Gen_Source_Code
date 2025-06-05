"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

interface SelectedCheckboxProps {
  itemId?: number;
  isHeader?: boolean;
  onSelectionChange: (ids: number[]) => void;
  allIds: number[];
  selectedRows?: number[];
}

export default function SelectedCheckbox({
  itemId,
  isHeader,
  onSelectionChange,
  allIds,
  selectedRows,
}: SelectedCheckboxProps) {
  //   select all rows
  const selectAll = selectedRows?.length === allIds.length && allIds.length > 0;

  //   a function to handle checkbox change
  const handleSelect = () => {
    if (isHeader) {
      // handle select all rows
      const newSelection = selectAll ? [] : allIds;
      onSelectionChange(newSelection);
    } else if (itemId) {
      // handle single row selection
      const newSelection = selectedRows?.includes(itemId)
        ? selectedRows.filter((id) => id !== itemId)
        : [...(selectedRows || []), itemId];
      onSelectionChange(newSelection);
    }
  };

  return (
    <>
      <Checkbox
        checked={isHeader ? selectAll : selectedRows?.includes(itemId || 0)}
        onCheckedChange={handleSelect}
      />
    </>
  );
}
