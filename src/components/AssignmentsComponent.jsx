import { useEffect, useState } from "react";
import AddNewProjectComponent from "./AddNewProjectComponent";
import CardComponent from "./CardComponent";

export default function AssignmentsComponent({ searchProject }) {
  // state to store project
  const [allProjects, setAllProjects] = useState([]);

  // state to store filter projects
  const [filterProjects, setFilterProjects] = useState([]);

  const handleAddNewProject = (newProject) => {
    setAllProjects((prev) => [...prev, newProject]);
    setFilterProjects((prev) => [...prev, newProject]);
  };

  // Add a new project
  // const handleAddNewProject = (newProject) => {
  //   setAllProjects((prev) => {
  //     const updatedProjects = [...prev, newProject];
  //     setFilterProjects(updatedProjects); // Sync filtered projects
  //     return updatedProjects;
  //   });
  // };

  const handleSearchProjectName = () => {
    if (!searchProject) {
      setFilterProjects(allProjects);
    } else {
      const filterBySearch = allProjects?.filter((item) => {
        if (
          item?.projectName.toLowerCase().includes(searchProject.toLowerCase())
        ) {
          return item;
        }
      });
      setFilterProjects(filterBySearch);
    }
  };

  useEffect(() => {
    handleSearchProjectName();
  }, [searchProject]);

  return (
    <div className="h-full ">
      <div className="flex justify-between items-center">
        {/* assignments  */}
        <h2 className="text-xl font-semibold">Assignments</h2>

        {/* add new project component */}
        <AddNewProjectComponent handleAddNewProject={handleAddNewProject} />
      </div>

      {/* card component */}
      <div className="overflow-auto h-[800px] no-scrollbar">
        <CardComponent projects={filterProjects} />
      </div>
    </div>
  );
}
