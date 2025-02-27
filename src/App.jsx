import { useState } from "react";
import "./App.css";
import AssignmentsComponent from "./components/AssignmentsComponent";
import DashboardComponent from "./components/DashboardComponent";
import LearningMaterialsComponent from "./components/LearningMaterialsComponent";
import SidebarComponent from "./components/SidebarComponent";
import TopNavbarComponent from "./components/TopNavbarComponent";

function App() {
  const [searchProject, setSearchProject] = useState("");

  // get search value
  const handleSearchProject = (searchValue) => {
    console.log(searchValue);
    setSearchProject(searchValue);
  };

  return (
    <>
      <div className="font-rubik text-primary-text bg-light-gray flex h-screen overflow-hidden">
        {/* sidebar */}
        <div className="w-1/5">
          <SidebarComponent />
        </div>

        {/* top navigation bar */}
        <div className="w-4/5 p-12">
          <TopNavbarComponent handleSearchProject={handleSearchProject} />

          {/* dashboard summary */}
          <div className="flex justify-between">
            <div className="w-9/12 mt-5 space-y-5">
              <DashboardComponent />
              <AssignmentsComponent searchProject={searchProject} />
            </div>

            <div className="w-3/12 pl-10 mt-5">
              <LearningMaterialsComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
