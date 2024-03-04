import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center p-4 text-sm text-foreground my-24 gap-4">
      {children}
    </div>
  );
}

export default layout;
