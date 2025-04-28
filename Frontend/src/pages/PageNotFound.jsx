import React from "react";

const PageNotFound = () => {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center ">
        <div className="text-2xl">404</div>
        <div className="text-2xl font-semibold text-red-500">
          Page not found
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
