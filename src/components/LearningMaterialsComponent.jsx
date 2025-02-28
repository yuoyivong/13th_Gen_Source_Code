import { useEffect, useState } from "react";
import { learningMaterials } from "../data/learningMaterials";
import { Star } from "lucide-react";
import FilterComponent from "./FilterComponent";

export default function LearningMaterialsComponent() {
  const [materialsList, setMaterialsList] = useState(learningMaterials);
  const [sortLearningMaterialsBy, setSortLearningMaterialsBy] = useState("");

  // click on star icon to change the status
  const handleIsFavoriteChange = (id) => {
    setMaterialsList((prev) =>
      prev?.map((material) =>
        material?.id === id
          ? { ...material, isFavorite: !material.isFavorite }
          : material
      )
    );
  };

  // format date
  const formattedDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const newDate = new Date(date).toLocaleDateString("en-US", options);
    return newDate;
  };

  // sort by asc or desc order
  const handleSort = (sortBy) => {
    setSortLearningMaterialsBy(sortBy);
    if (sortBy === "A-Z") {
      setMaterialsList((prev) =>
        prev?.sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (sortBy === "Z-A") {
      setMaterialsList((prev) =>
        prev?.sort((a, b) => b.title.localeCompare(a.title))
      );
    } else {
      return;
    }
  };

  return (
    <div className="bg-white drop-shadow-lg rounded-2xl overflow-auto max-h-5/6 no-scrollbar">
      {/* calling filter component */}
      <FilterComponent handleSort={handleSort} />

      {/* title */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Learning Materials</h2>
        <img src="/more.svg" alt="three dot" width={30} height={30} />
      </div>

      {/* materials list */}
      <div className="space-y-3">
        {materialsList?.map((material) => (
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

            <div className="w-full">
              <div className="flex justify-between">
                <p className="text-base font-medium">{material?.title}</p>
                <button
                  onClick={() => handleIsFavoriteChange(material?.id)}
                  className="cursor-pointer"
                >
                  <Star
                    size={20}
                    fill={`${material?.isFavorite ? "#FAA300" : "none"}`}
                    stroke={`${material?.isFavorite ? "#FAA300" : "#2B343B"}`}
                  />
                </button>
              </div>
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
