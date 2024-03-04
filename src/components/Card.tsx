import React from 'react';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white w-full rounded-2xl shadow-custom p-4">
      {children}
    </div>
  );
}

export default Card;
