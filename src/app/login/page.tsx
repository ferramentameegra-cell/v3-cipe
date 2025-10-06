'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, EyeOff, Brain, Shield, Zap, Users, 
  Loader2, CheckCircle, AlertCircle, Mail, Lock
} from 'lucide-react';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular validação
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (credentials.email && credentials.password) {
        // Simular login bem-sucedido
        localStorage.setItem('user', JSON.stringify({
          name: 'Ronaldo Nogueira',
          email: credentials.email,
          candidateId: '1014',
          role: 'CANDIDATE'
        }));
        
        router.push('/dashboard/1014');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="modernize-card shadow-strong">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full mb-4 mx-auto shadow-medium"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            
            <CardTitle className="text-3xl font-bold text-gradient mb-2">
              CIPE
            </CardTitle>
            
            <p className="text-gray-600 text-sm mb-4">
              Central de Inteligência Política e Eleitoral
            </p>

            {/* Status do Sistema */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-success-500"></div>
              <span className="text-xs text-gray-500">Sistema Online</span>
            </div>

            {/* Badges de Recursos */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="default" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Seguro
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Inteligente
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                Profissional
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="email"
                    placeholder="admin@cipe.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar no Sistema'
                )}
              </Button>
            </motion.form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Use qualquer email e senha para acessar o sistema de demonstração
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
