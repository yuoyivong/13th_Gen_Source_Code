import { useState } from "react";
import AddNewProjectComponent from "./AddNewProjectComponent";
import CardComponent from "./CardComponent";

export default function AssignmentsComponent() {
  // state to store project
  const [projects, setProjects] = useState({});

  const handleAddNewProject = (pro) => {
    console.log(pro);
    setProjects(pro);
  };

  return (
    <div>
      <div className="flex justify-between">
        {/* assignments  */}
        <h2 className="text-xl font-semibold">Assignments</h2>

        {/* add new project component */}
        <AddNewProjectComponent handleAddNewProject={handleAddNewProject} />
      </div>

      {/* card component */}
      <CardComponent projects={projects} />
    </div>
  );
}
