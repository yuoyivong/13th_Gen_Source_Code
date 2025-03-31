const formattedDate = (date: Date) => {
  const newDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return newDate;
};

export default formattedDate;
