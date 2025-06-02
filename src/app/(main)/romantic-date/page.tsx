import React from "react";
import RomanticDateTable from "../_components/table/romantic-date-table";
import { Calendar } from "iconsax-react";
import MemoryPopup from "../_components/popup/memory-popup";

export default function RomanticDatePage() {
  return (
    <main className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        {/* title */}
        <div className="w-full space-y-1">
          <h1 className="font-semibold text-2xl flex gap-3 text-dark-cyan">
            <Calendar size={28} color="#309898" variant="Broken" />
            <p>
              My <span className="text-coral-pink">Dating</span> Schedule
            </p>
          </h1>
          <div className="w-1/5 h-0.5 bg-gradient-to-r from-transparent  via-dark-cyan/80 to-transparent rounded-full"></div>
        </div>

        {/* add new memory popup */}
        <MemoryPopup type="create" />
      </div>
      <RomanticDateTable />
    </main>
  );
}
