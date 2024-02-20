import React from "react";
import DefaultLayout from "@/app/layouts/DefaultLayout";

interface MainContentProps {
  pageTitle: string;
  children?: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ pageTitle, children }) => {
  return (
    <DefaultLayout>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-extrabold">{pageTitle}</h1>
        {children}
      </div>
    </DefaultLayout>
  );
};

export default MainContent;
