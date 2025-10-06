'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se há usuário logado
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/dashboard/1014');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-2xl">C</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">CIPE</h1>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}
