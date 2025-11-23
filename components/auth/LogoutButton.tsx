"use client";

import { useCallback } from 'react';
import { useClerk } from '@clerk/nextjs';

type Props = {
  children?: React.ReactNode;
  className?: string;
  redirectUrl?: string;
};

export default function LogoutButton({ children, className, redirectUrl = '/' }: Props) {
  const { signOut } = useClerk();

  const onClick = useCallback(async () => {
    try {
      await signOut({ redirectUrl });
    } catch (e) {
      // no-op; Clerk handles errors internally
      console.error(e);
    }
  }, [signOut, redirectUrl]);

  return (
    <button type="button" onClick={onClick} className={className}>
      {children ?? 'Logout'}
    </button>
  );
}
