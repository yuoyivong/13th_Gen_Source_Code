import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";

export default function CardComponent({ projects }) {
  // all projects
  const [projectList, setProjectList] = useState(projects);

  // format date to Jun 17, 2024
  const formattedDate = (date) => {
    const newDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return newDate;
  };

  // calculate date
  const calculateDate = (date) => {
    const currentDate = new Date();
    const dueDate = new Date(date);

    // Calculate the difference in milliseconds
    const diffMs = dueDate - currentDate;

    // Convert milliseconds to days
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Due Today";
    if (diffDays === 1) return "1 day left";
    if (diffDays < 7) return `${diffDays} days left`;
    if (diffDays < 14) return "1 week left";
    return `${Math.floor(diffDays / 7)} weeks left`;
  };

  useEffect(() => {
    if (projects) {
      setProjectList(projects);
    }
  }, [projects]);

  return (
    <div>
      {projectList?.length >= 0 && (
        <div className="grid grid-cols-3 gap-6 mt-6">
          {projectList?.map((project, index) => (
            <div
              key={index}
              className="max-w-sm p-6 bg-white rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-between mb-5">
                {/* date */}
                <p
                  className={`${
                    Number(project?.progress) === 100
                      ? "text-custom-sky-blue"
                      : Number(project?.progress) === 75
                      ? "text-custom-carrot"
                      : Number(project?.progress) === 50
                      ? "text-custom-yellow-500"
                      : "text-custom-pink"
                  } font-medium`}
                >
                  {formattedDate(project?.dueDate)}
                </p>
                <EllipsisVertical size={20} color="#374957" />
              </div>

              <h5 className="capitalize mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {project?.projectName}
              </h5>
              <p className="h-12 line-clamp-2 mb-3 font-normal text-justify text-gray-400 dark:text-gray-400">
                {project?.description
                  ? project?.description
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ea necessitatibus itaque. Iusto, illo est, quos unde fugiat itaque maiores quae optio corrupti sit cumque voluptas qui eveniet mollitia eum."}
              </p>

              {/* progress bar */}
              <div className="w-full flex justify-between font-medium mb-1">
                <p>Progress</p>
                <p>{project?.progress} %</p>
              </div>
              <div
                className={`${
                  Number(project?.progress) === 100
                    ? "w-full"
                    : Number(project?.progress) === 75
                    ? "w-3/4 "
                    : Number(project?.progress) === 50
                    ? "w-2/4"
                    : "w-1/4"
                } relative mb-5 rounded-full h-2.5 dark:bg-gray-700`}
              >
                <div
                  className={`${
                    Number(project?.progress) === 100
                      ? "bg-custom-sky-blue"
                      : Number(project?.progress) === 75
                      ? "bg-custom-carrot"
                      : Number(project?.progress) === 50
                      ? "bg-custom-yellow"
                      : "bg-custom-pink"
                  } h-2.5 rounded-full`}
                ></div>

                {/* <button
                  className="border-l-4 rounded-full border-l-custom-pink h-5 absolute -top-1 left-1/4"
                  title="25%"
                  onClick={() => handleChangeProgress(25)}
                ></button>

                <button
                  className="border-l-4 rounded-full border-l-custom-yellow-500 h-5 absolute -top-1 left-2/4"
                  title="50%"
                  onClick={() => handleChangeProgress(50)}
                ></button>

                <button
                  className="border-l-4 rounded-full border-l-custom-carrot h-5 absolute -top-1 left-3/4"
                  title="75%"
                  onClick={() => handleChangeProgress(75)}
                ></button> */}
              </div>

              {/* deadline */}
              <div className="flex justify-end">
                <p className="font-medium bg-light-gray py-1.5 px-4 rounded-lg text-center">
                  {calculateDate(project?.dueDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
