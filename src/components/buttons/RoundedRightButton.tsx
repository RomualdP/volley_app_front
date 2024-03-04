import React from 'react';
import Link from 'next/link';

function RoundedRightButton({
  path,
  icon,
}: {
  path: string;
  icon: React.JSX.Element;
}) {
  return (
    <Link
      href={path}
      className="rounded-full bg-secondary justify-center items-center p-4 fixed bottom-24 right-4"
    >
      {icon}
    </Link>
  );
}

export default RoundedRightButton;
