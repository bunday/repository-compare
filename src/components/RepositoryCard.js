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
      <div className="flex">
        <div className="w-3/4 bg-white mr-8 border border-gray-300 rounded flex">
          <span className="bg-gray-300 p-2"> https://github.com/</span>
          <input
            className="p-2"
            placeholder="repository name"
            onChange={inputChange}
            name={index}
          />
        </div>

        <button
          onClick={() => fetchRepository(index)}
          className="bg-blue-500 w-1/4 flex justify-center items-center text-white border p-2 rounded"
        >
          Go
        </button>
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
              <div className="w-full flex justify-center items-center">
                <img alt="prize" src={currentTotal >= 2 ? "../icons/gold-medal.svg" : "../icons/silver-medal.svg"} />
              </div>
              <div className="w-full">
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
