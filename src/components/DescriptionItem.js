import React from "react";

export default function DescriptionItem({title, value, icon}) {
  return (
    <div className="flex border-b justify-end py-2">
      <span className="pr-4 text-gray-300 uppercase"> {title} </span>
      <span className="pr-4"> {value}</span>
      <img width="20px" src={icon} alt={title} />
    </div>
  );
}
