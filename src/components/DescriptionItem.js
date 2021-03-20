import React from "react";

export default function DescriptionItem() {
  return (
    <div className="flex border-b justify-end py-2">
      <span className="pr-4 text-gray-300 uppercase"> stars </span>
      <span className="pr-4"> 154,900</span>
      <img width="20" src="../icons/star.svg" />
    </div>
  );
}
