import React from "react";
import RomanticDateTable from "../_components/table/romantic-date-table";
import { Calendar } from "iconsax-react";
import MemoryPopup from "../_components/popup/memory-popup";

export default function RomanticDatePage() {
  return (
    <main className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        {/* title */}
        <h1 className="font-semibold text-2xl flex gap-3 text-dark-cyan">
          <Calendar size={28} color="#309898" variant="Broken" />
          <p>
            My <span className="text-coral-pink">Dating</span> Schedule
          </p>
        </h1>

        {/* add new memory popup */}
        <MemoryPopup type="create" />
      </div>
      <RomanticDateTable />;
    </main>
  );
}
