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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-2xl">C</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">CIPE</h1>
        <p className="text-slate-400">Carregando...</p>
      </div>
    </div>
  );
}
