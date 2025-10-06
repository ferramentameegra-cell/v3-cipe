'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/1014');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Studio Admin</h1>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}
