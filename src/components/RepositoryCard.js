import React from "react";
import DescriptionItem from "./DescriptionItem";

export default function RepositoryCard({
  index,
  state,
  inputChange,
  fetchRepository,
}) {
  const repository = state.repository && state.repository[index];
  const loading = state.loading && state.loading[index];
  const error = state.error && state.error[index];

  const { result } = state;
  let currentTotal = result ? result.filter(res => res[index] === 1).length : 0;
  return (
    <div className="lg:w-2/5 w-full">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/4 w-full bg-white border border-gray-300 rounded flex">
          <span className="bg-gray-300 p-2"> https://github.com/</span>
          <input
            className="p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="repository name"
            onChange={inputChange}
            name={index}
          />
        </div>

        <div className="lg:w-1/4 lg:my-0 my-2 flex justify-end">
        <button
          onClick={() => fetchRepository(index)}
          className="bg-blue-500 flex justify-center items-center text-white border p-2 rounded"
        >
          Go
        </button>
        </div>
      </div>
      <div className="bg-white border border-gray-300 p-2 rounded mt-4">
        {repository && (
          <div>
            <div>
              <span className="text-blue-500">{repository.nameWithOwner}</span>
            </div>
            <div>
              <span className="text-gray-600">
               {repository.description}
              </span>
            </div>
            <div className="flex justify-between px-12 py-4">
              <div className=" flex justify-center items-center">
                <img alt="prize" className="object-contain h-24 w-full" src={currentTotal >= 2 ? "../icons/gold-medal.svg" : "../icons/silver-medal.svg"} />
              </div>
              <div className="">
                <DescriptionItem title='stars' value={repository.stargazerCount} icon='../icons/star.svg' />
                <DescriptionItem title='fork' value={repository.forkCount} icon='../icons/fork.svg' />
                <DescriptionItem title='watchers' value={repository.watchers.totalCount} icon='../icons/eyes.svg' />
                <DescriptionItem title='issues' value={repository.issues.totalCount} icon='../icons/email.svg' />
              </div>
            </div>
          </div>
        )}
      {loading && <p className="text-blue-500"> Loading, Please wait</p>}
      {error && <p className="text-red-500"> {error}</p>}
      </div>
    </div>
  );
}
