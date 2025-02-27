import React from "react";
import AddNewProjectComponent from "./AddNewProjectComponent";
import CardComponent from "./CardComponent";

export default function AssignmentsComponent() {
  return (
    <div>
      <div className="flex justify-between">
        {/* assignments  */}
        <h2 className="text-xl font-semibold">Assignments</h2>

        {/* add new project component */}
        <AddNewProjectComponent />
      </div>

      {/* card component */}
      <CardComponent />
    </div>
  );
}
