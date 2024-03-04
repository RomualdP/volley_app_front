import React from 'react';
import { ExitIcon } from '@radix-ui/react-icons';
export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        <ExitIcon width={24} height={24} />
      </button>
    </form>
  );
}
