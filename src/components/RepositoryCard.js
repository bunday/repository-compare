import React from "react";
import DescriptionItem from "./DescriptionItem";

export default function RepositoryCard() {
  return (
    <div className="w-2/5">
      <div className="flex">
        <input className="w-3/4 bg-white mr-8 border border-gray-300 p-2 rounded" />
        <button className="bg-blue-500 w-1/4 flex justify-center items-center text-white border p-2 rounded">
          Go
        </button>
      </div>
      <div className="bg-white border border-gray-300 p-2 rounded mt-4">
        <div>
          <span className="text-blue-500">facebook/react</span>
        </div>
        <div>
          <span className="text-gray-300">
            A description of what the the repository is about
          </span>
        </div>
        <div className="flex justify-between px-12 py-4">
          <div className="w-full flex justify-center items-center">
            <img width="100" src="../icons/gold-medal.svg" />
          </div>
          <div className="w-full">
            <DescriptionItem />
          </div>
        </div>
      </div>
    </div>
  );
}

