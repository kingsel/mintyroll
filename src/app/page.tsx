'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to Mintyroll!</h1>
        {user ? (
          <>
            <p className="text-lg mb-4">Hello, {user.email}!</p>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="space-x-4">
            <Link href="/login" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Login
            </Link>
            <Link href="/signup" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}