import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddNewProjectComponent({ handleAddNewProject }) {
  const [singleProject, setSingleProject] = useState({
    projectName: "",
    dueDate: "",
    progress: 0,
    description: "",
  });

  //   handle error input form
  const [errors, setErrors] = useState();

  // function for getting value from input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSingleProject((prev) => ({ ...prev, [name]: value }));
    setErrors({ ...errors, [name]: "" });
  };

  //   form validation
  const handleFormValidation = () => {
    const newErrors = {};
    const currentDate = new Date();

    // project name error
    if (!singleProject?.projectName)
      newErrors.projectNameError = "* Project name is required.";

    //   due date error
    if (!singleProject.dueDate) {
      newErrors.dueDateError = "* Please choose the deadline of your project.";
    } else if (new Date(singleProject.dueDate) < currentDate) {
      newErrors.dueDateError =
        "* Selected date cannot be lower than current date.";
    }

    // progress error
    if (!singleProject.progress)
      newErrors.progressError = "* Please select your project progress.";

    return newErrors;
  };

  //   when user submits the form, pass that object to its parent
  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      const validateionErrors = handleFormValidation();
      if (Object.keys(validateionErrors).length > 0) {
        setErrors(validateionErrors);
      } else {
        console.log(singleProject);
        setErrors({});

        handleAddNewProject(singleProject);
        handleResetForm();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //   reset form function
  const handleResetForm = () => {
    setSingleProject({
      projectName: "",
      dueDate: "",
      progress: "",
      description: "",
    });
  };

  return (
    <div>
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className=" text-white bg-custom-sky-blue hover:bg-custom-sky-blue-500 focus:ring-3 focus:outline-none focus:ring-custom-sky-blue-500  font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-custom-sky-blue-500 dark:hover:bg-custom-sky-blue-500  dark:focus:ring-custom-sky-blue-500  flex items-center gap-2"
        type="button"
      >
        <Plus size={22} /> <span className="text-base">New Project</span>
      </button>

      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-2xl shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Project
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={handleResetForm}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* form create project */}
            <form className="p-4 md:p-5" onSubmit={handleFormSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="projectName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    id="projectName"
                    value={singleProject?.projectName}
                    className={`${
                      errors?.projectNameError
                        ? "border border-red-500 focus:ring-red-600 focus:border-red-600"
                        : "border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                    } bg-gray-50 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                    placeholder="Type Project Name"
                    onChange={handleInputChange}
                  />

                  {/* if project name field is empty */}
                  {errors?.projectNameError && (
                    <p className="text-red-600 pt-1">
                      {errors?.projectNameError}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="dueDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={singleProject?.dueDate}
                    className={`${
                      errors?.dueDateError
                        ? "border border-red-500 focus:ring-red-600 focus:border-red-600"
                        : "border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                    } bg-gray-50  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                    onChange={handleInputChange}
                  />

                  {/* if due date field is empty */}
                  {errors?.dueDateError && (
                    <p className="text-red-600 pt-1">{errors?.dueDateError}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="progress"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Progress
                  </label>
                  <select
                    id="progress"
                    name="progress"
                    value={singleProject?.progress}
                    className={`${
                      errors?.progressError
                        ? "border border-red-500 focus:ring-red-600 focus:border-red-600"
                        : "border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                    } bg-gray-50  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                    onChange={handleInputChange}
                  >
                    <option defaultValue="">Select Progress</option>
                    <option value="100">100</option>
                    <option value="75">75</option>
                    <option value="50">50</option>
                    <option value="25">25</option>
                  </select>

                  {/* if progress field empty */}
                  {errors?.progressError && (
                    <p className="text-red-600 pt-1">{errors?.progressError}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={singleProject?.description}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-custom-sky-blue hover:bg-custom-sky-blue-500 focus:ring-4 focus:outline-none focus:ring-custom-sky-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-custom-sky-blue-500 dark:hover:bg-custom-sky-blue-500 dark:focus:ring-custom-sky-blue-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
