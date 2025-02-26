import React from "react";
import { dashboard } from "../data/dashboard";

export default function DashboardComponent() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">Dashboard</h2>

      {/* display summary on each card */}
      <div className="flex gap-5">
        {dashboard?.map((d) => (
          <div
            key={d?.id}
            className="flex bg-white gap-5 py-3.5 px-4 rounded-xl w-full"
          >
            <div className={`${d?.color} p-3 rounded-xl`}>
              <img src={d.icon} alt="file icon" />
            </div>
            <div>
              <p className="text-xl font-semibold">{d?.totalTasks}</p>
              <p className="text-gray-400">{d?.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
