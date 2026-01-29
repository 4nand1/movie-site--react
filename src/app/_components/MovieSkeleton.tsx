"use client";

export const MovieSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-[1080px] flex-end mt-4">
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col items-center top-[191px] gap-6">
        <div className="w-[1080px] flex justify-between">
          <div className="h-[72px] flex flex-col gap-2">
            <div className="h-9 w-64 bg-gray-300 rounded"></div>
            <div className="h-5 w-96 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-7 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
        
        <div className="w-[1080px] h-[428px] flex justify-between gap-6">
          <div className="w-1/3 bg-gray-300 rounded"></div>
          <div className="flex-1 bg-gray-300 rounded"></div>
        </div>

        <div className="h-[271px] w-[1080px] gap-5 flex flex-col">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-7 w-20 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="h-5 w-32 bg-gray-300 rounded"></div>
          <div className="h-5 w-64 bg-gray-200 rounded"></div>
        </div>

        <div className="w-[1080px] space-y-4 mb-10 gap-3">
          <div className="flex justify-between">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="h-9 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-64 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
