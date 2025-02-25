import "./App.css";
import DashboardComponent from "./components/DashboardComponent";
import LearningMaterialsComponent from "./components/LearningMaterialsComponent";
import SidebarComponent from "./components/SidebarComponent";
import TopNavbarComponent from "./components/TopNavbarComponent";

function App() {
  return (
    <>
      <div className="font-rubik text-primary-text bg-light-gray flex h-screen overflow-hidden">
        {/* sidebar */}
        <div className="w-1/5">
          <SidebarComponent />
        </div>

        {/* top navigation bar */}
        <div className="w-4/5 p-12">
          <TopNavbarComponent />

          {/* dashboard summary */}
          <div className="flex justify-between">
            <div className="w-9/12 mt-5">
              <DashboardComponent />
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
