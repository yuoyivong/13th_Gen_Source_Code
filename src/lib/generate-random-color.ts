const getRandomColorClass = (index: number) => {
  const colors = [
    "bg-red-700",
    "bg-blue-700",
    "bg-green-700",
    "bg-yellow-700",
    "bg-pink-700",
    "bg-purple-700",
    "bg-teal-700",
    "bg-indigo-700",
    "bg-orange-700",
    "bg-gray-700",
    "bg-royal-blue",
    "bg-watermelon-red",
    "bg-light-steel-blue",
    "bg-persian-green",
  ];
  return colors[index % colors.length];
};

export default getRandomColorClass;
