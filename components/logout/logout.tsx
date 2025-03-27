'use client';

import { useAuth } from '@/hooks/useAuth';

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button 
      onClick={logout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}