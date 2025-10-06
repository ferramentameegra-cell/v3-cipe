'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, EyeOff, Brain, Shield, Zap, Users, 
  Loader2, CheckCircle, AlertCircle 
} from 'lucide-react';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '', twoFactor: '' });
  const [step, setStep] = useState<'login' | '2fa'>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [systemStatus, setSystemStatus] = useState('online');
  const router = useRouter();

  // Verificar se já está logado
  useEffect(() => {
    const checkSession = async () => {
      const user = localStorage.getItem('user');
      if (user) {
        router.push('/dashboard/1014');
      }
    };
    checkSession();
  }, [router]);

  // Simular status do sistema
  useEffect(() => {
    const statuses = ['online', 'maintenance', 'high-load'];
    const interval = setInterval(() => {
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular validação
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (credentials.email && credentials.password) {
        setStep('2fa');
      } else {
        alert('Preencha todos os campos');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro no servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handle2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular validação 2FA
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.twoFactor) {
        // Simular login bem-sucedido
        localStorage.setItem('user', JSON.stringify({
          name: 'Ronaldo Nogueira',
          email: credentials.email,
          candidateId: '1014',
          role: 'CANDIDATE'
        }));
        
        router.push('/dashboard/1014');
      } else {
        alert('Digite o código 2FA');
      }
    } catch (error) {
      console.error('Erro no 2FA:', error);
      alert('Código 2FA inválido');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'online': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'high-load': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (systemStatus) {
      case 'online': return 'Sistema Online';
      case 'maintenance': return 'Manutenção';
      case 'high-load': return 'Alta Demanda';
      default: return 'Status Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Partículas Flutuantes */}
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <Card className="glass-card interactive-card">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 mx-auto neon-border"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              CIPE
            </CardTitle>
            
            <p className="text-slate-300 text-sm mb-4">
              Central de Inteligência Política e Eleitoral
            </p>

            {/* Status do Sistema */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
              <span className="text-xs text-slate-400">{getStatusText()}</span>
            </div>

            {/* Badges de Recursos */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                <Shield className="w-3 h-3 mr-1" />
                Seguro
              </Badge>
              <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                <Zap className="w-3 h-3 mr-1" />
                Inteligente
              </Badge>
              <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-300">
                <Users className="w-3 h-3 mr-1" />
                Profissional
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            {step === 'login' ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email</label>
                  <Input
                    type="email"
                    placeholder="admin@cipe.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Senha</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="123456"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 h-12 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-base transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handle2FA}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-white">Autenticação 2FA</h3>
                  <p className="text-sm text-slate-400">Digite o código do seu aplicativo autenticador</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Código 2FA</label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={credentials.twoFactor}
                    onChange={(e) => setCredentials({...credentials, twoFactor: e.target.value})}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 h-12 text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium text-base transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    'Confirmar'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('login')}
                  className="w-full text-slate-400 hover:text-white"
                >
                  Voltar
                </Button>
              </motion.form>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Use qualquer email e senha para acessar o sistema de demonstração
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
