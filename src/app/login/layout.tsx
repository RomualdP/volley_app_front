import Card from '@/src/components/Card';
import Link from 'next/link';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex justify-between">
        <Link href={'/login'}>Se connecter</Link>
        <Link href={'/login/signup'}>{"S'inscrire"}</Link>
      </div>
      <Card>{children}</Card>
    </div>
  );
}

export default layout;
