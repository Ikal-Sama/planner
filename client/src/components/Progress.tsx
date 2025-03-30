import React from "react";

interface ProgressProps {
  value: number; // Percentage value (0-100)
}

export const Progress: React.FC<ProgressProps> = ({ value }) => {
  return (
    <div className='w-full bg-gray-200 rounded-full h-2'>
      <div
        className='bg-blue-500 h-2 rounded-full transition-all duration-300'
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
