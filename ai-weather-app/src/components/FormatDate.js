import React from "react";

const FormatDate = ({ date }) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[date.getDay()];
  let hours = date.getHours();
  const time = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return (
    <div>
      {day} {hours}:{minutes} {time}
    </div>
  );
};

export default FormatDate;
