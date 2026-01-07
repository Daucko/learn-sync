"use client";

import { useCallback } from 'react';
import { useAuth } from '@/components/providers/auth-provider';

type Props = {
  children?: React.ReactNode;
  className?: string;
  redirectUrl?: string;
};

export default function LogoutButton({ children, className, redirectUrl = '/' }: Props) {
  const { logout } = useAuth();

  const onClick = useCallback(async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
  }, [logout]);

  return (
    <button type="button" onClick={onClick} className={className}>
      {children ?? 'Logout'}
    </button>
  );
}
