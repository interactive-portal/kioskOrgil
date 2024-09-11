const SkeletonItemDefault = ({}) => {
  return (
    // <div className="rounded-2xl border border-gray-50 p-3 flex flex-col gap-5 select-none animate-pulse">
    //   <div className="h-5 rounded-xl bg-gray-400 animate-pulse"></div>
    //   <div className="flex flex-col flex-1 gap-5">
    //     <div className="flex flex-1 flex-col gap-3">
    //       <div className="bg-gray-400 w-full animate-pulse h-8 rounded-2xl"></div>
    //       <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
    //       <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
    //     </div>
    //     <div className="mt-auto flex gap-3">
    //       <div className="bg-gray-400 w-1/3 h-5 animate-pulse rounded-full"></div>
    //       <div className="bg-gray-400 w-1/3 h-5 animate-pulse rounded-full ml-auto"></div>
    //     </div>
    //   </div>
    // </div>
    <div className="space-y-5  bg-gray-900 p-4 bg-gradient-to-r from-transparent via-gray-600   animate-pulse to-transparent">
      <div className="h-32 rounded-lg bg-gray-600"></div>
      <div className="space-y-3">
        <div className="h-3 rounded-lg bg-gray-600"></div>
        <div className="h-3 rounded-lg bg-gray-600"></div>
        <div className="h-3 rounded-lg bg-gray-600"></div>
      </div>
    </div>
  );
};

export default SkeletonItemDefault;
