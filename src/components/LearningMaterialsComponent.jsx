import React from "react";
import { learningMaterials } from "../data/learningMaterials";

export default function LearningMaterialsComponent() {
  // format date
  const formattedDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const d = new Date(date).toLocaleDateString("en-US", options);
    return d;
  };

  return (
    <div className=" bg-white drop-shadow-lg rounded-2xl overflow-auto h-auto no-scrollbar">
      {/* title */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">Learning Materials</h2>
      </div>

      {/* materials list */}
      <div className="space-y-3">
        {learningMaterials?.map((material) => (
          <div
            key={material?.id}
            className="bg-light-gray px-4 py-2 flex gap-5 items-center"
          >
            <img
              src={material?.image}
              alt={material?.title}
              width={50}
              height={50}
              className="rounded-xl"
            />

            <div>
              <p className="text-base font-medium">{material?.title}</p>
              <p className="text-gray-400 text-sm">
                Posted at: {formattedDate(material?.postedAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
