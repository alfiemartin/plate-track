import React, { ReactNode } from "react";

type StepTitleProps = {
  title: string;
  subtitle: string | ReactNode;
};

const StepTitle = ({ title, subtitle }: StepTitleProps) => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold">{title}</h1>
      <h2 className="text-xl font-medium">{subtitle}</h2>
    </div>
  );
};

export default StepTitle;
