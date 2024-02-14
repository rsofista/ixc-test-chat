import React from "react";

export const MainContainer = ({
  children,
  size,
}: {
  children: React.ReactNode;
  size: "lg" | "md";
}) => {
  return (
    <main
      className={`mx-auto mt-8 w-full ${
        size === "lg" ? "max-w-7xl" : size === "md" ? "max-w-4xl" : ""
      } `}
    >
      <div className="mx-2 bg-white rounded-3xl h-[calc(100vh-4rem)]">
        {children}
      </div>
    </main>
  );
};
