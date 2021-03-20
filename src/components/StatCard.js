import React from "react";

export default function StatCard({ state }) {
  const { result } = state;
  let totalFirst = result ? result.filter((res) => res.first === 1).length : 0;
  let totalSecond = result
    ? result.filter((res) => res.second === 1).length
    : 0;
  const getRepositorySignal = () => {
    if (!result) return;
    return result.map((res, i) => {
      return (
        <div key={i} className="text-center">
          {" "}
          {res.first} - {res.second}
        </div>
      );
    });
  };
  return (
    <div className="lg:w-1/5 w-full flex flex-col items-center py-4">
      <div className="flex justify-center items-center">
        <span> VS </span>
      </div>
      <div className="flex flex-col pt-16">{getRepositorySignal()}</div>
      {result && (
        <div className="flex flex-col pt-16">
          <div className="text-center text-xl">
            {totalFirst} - {totalSecond}
          </div>
        </div>
      )}
    </div>
  );
}
