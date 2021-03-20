import React from 'react'

export default function StatCard() {
    return (
        <div className="w-1/5">
          <div className="flex justify-center items-center">
            <span> VS </span>
          </div>
          <div className="flex flex-col pt-16">
            <div className="text-center">0 - 1</div>
            <div className="text-center">1 - 0</div>
            <div className="text-center">0 - 1</div>
            <div className="text-center">1 - 0</div>
          </div>
          <div className="flex flex-col pt-16">
            <div className="text-center text-xl">2 - 2</div>
          </div>
        </div>
    )
}
