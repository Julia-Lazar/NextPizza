import React from "react";

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export const Main: React.FC<MainProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Top sketched border */}
      <svg
        className="absolute top-0 left-0 w-full h-2"
        viewBox="0 0 1000 10"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,5 Q25,3 50,5 T100,5 T150,5 T200,5 T250,5 T300,5 T350,5 T400,5 T450,5 T500,5 T550,5 T600,5 T650,5 T700,5 T750,5 T800,5 T850,5 T900,5 T950,5 T1000,5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Content */}
      <div className="py-4">{children}</div>

      {/* Bottom sketched border */}
      <svg
        className="absolute bottom-0 left-0 w-full h-2"
        viewBox="0 0 1000 10"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,5 Q25,7 50,5 T100,5 T150,5 T200,5 T250,5 T300,5 T350,5 T400,5 T450,5 T500,5 T550,5 T600,5 T650,5 T700,5 T750,5 T800,5 T850,5 T900,5 T950,5 T1000,5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
