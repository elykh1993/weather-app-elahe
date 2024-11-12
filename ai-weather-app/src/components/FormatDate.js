import React from "react";

const FormatDate = ({ date }) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[date.getDay()];

  return (
    <div>
      {day}
    </div>
  );
};

export default FormatDate;
