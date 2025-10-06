'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Eye, MessageSquare, Heart,
  Target, Zap, AlertTriangle, CheckCircle, Clock, DollarSign,
  Share2, ThumbsUp, Calendar, MapPin, Smartphone, Monitor
} from 'lucide-react';
import OracleCipe from '@/components/OracleCipe';

// Dados simulados
const intentionData = [
  { month: 'Jan', ronaldo: 42, adversario1: 35, adversario2: 23 },
  { month: 'Fev', ronaldo: 44, adversario1: 34, adversario2: 22 },
  { month: 'Mar', ronaldo: 43, adversario1: 36, adversario2: 21 },
  { month: 'Abr', ronaldo: 45, adversario1: 35, adversario2: 20 },
  { month: 'Mai', ronaldo: 47, adversario1: 33, adversario2: 20 },
  { month: 'Jun', ronaldo: 45, adversario1: 35, adversario2: 20 }
];

const socialData = [
  { platform: 'Instagram', followers: 128000, engagement: 8.5, growth: 15 },
  { platform: 'Facebook', followers: 89000, engagement: 6.2, growth: 8 },
  { platform: 'TikTok', followers: 45000, engagement: 12.3, growth: 32 },
  { platform: 'YouTube', followers: 23000, engagement: 4.8, growth: 12 },
  { platform: 'Twitter', followers: 67000, engagement: 3.2, growth: -2 }
];

const regionData = [
  { region: 'Centro', votes: 35, color: '#0066FF' },
  { region: 'Norte', votes: 28, color: '#6366F1' },
  { region: 'Sul', votes: 22, color: '#06B6D4' },
  { region: 'Leste', votes: 15, color: '#8B5CF6' }
];

const engagementData = [
  { time: '06:00', engagement: 2.1 },
  { time: '09:00', engagement: 4.5 },
  { time: '12:00', engagement: 6.8 },
  { time: '15:00', engagement: 5.2 },
  { time: '18:00', engagement: 8.9 },
  { time: '21:00', engagement: 12.3 },
  { time: '00:00', engagement: 3.4 }
];

export default function DashboardPage({ params }: { params: { candidateId: string } }) {
  const [realTimeData, setRealTimeData] = useState({
    onlineUsers: 1247,
    todayReach: 45230,
    todayEngagement: 3420,
    newFollowers: 234
  });

  // Simular dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 20) - 10,
        todayReach: prev.todayReach + Math.floor(Math.random() * 100) - 50,
        todayEngagement: prev.todayEngagement + Math.floor(Math.random() * 50) - 25,
        newFollowers: prev.newFollowers + Math.floor(Math.random() * 5) - 2
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, trend, color = "blue" }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glass-card interactive-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-slate-400">{title}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
              <div className="flex items-center space-x-1">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {change}
                </span>
                <span className="text-sm text-slate-500">vs. mês anterior</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${color}-500/20`}>
              <Icon className={`w-6 h-6 text-${color}-400`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-header backdrop-blur-sm border-b border-slate-700/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">RN</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Ronaldo Nogueira</h1>
                  <p className="text-sm text-slate-400">Deputado Federal - 1014</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <MessageSquare className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    3
                  </Badge>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Users className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Oracle CIPE */}
        <OracleCipe />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Intenção de Voto"
            value="45.2%"
            change="+3.2%"
            trend="up"
            icon={Target}
            color="blue"
          />
          <StatCard
            title="Alcance Total"
            value="285K"
            change="+15.8%"
            trend="up"
            icon={Eye}
            color="green"
          />
          <StatCard
            title="Engajamento Médio"
            value="8.5%"
            change="-0.3%"
            trend="down"
            icon={Heart}
            color="purple"
          />
          <StatCard
            title="Novos Seguidores"
            value={realTimeData.newFollowers.toLocaleString()}
            change="+12.4%"
            trend="up"
            icon={Users}
            color="cyan"
          />
        </div>

        {/* Real-time Metrics */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Métricas em Tempo Real</span>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                LIVE
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{realTimeData.onlineUsers.toLocaleString()}</div>
                <div className="text-sm text-slate-400">Usuários Online</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{realTimeData.todayReach.toLocaleString()}</div>
                <div className="text-sm text-slate-400">Alcance Hoje</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{realTimeData.todayEngagement.toLocaleString()}</div>
                <div className="text-sm text-slate-400">Interações Hoje</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">+{realTimeData.newFollowers}</div>
                <div className="text-sm text-slate-400">Seguidores Hoje</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Intenção de Voto */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Evolução da Intenção de Voto</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={intentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ronaldo" 
                    stroke="#0066FF" 
                    strokeWidth={3}
                    name="Ronaldo Nogueira"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="adversario1" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Adversário 1"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="adversario2" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    name="Adversário 2"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance por Região */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Performance por Região</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="votes"
                    label={({ region, votes }) => `${region}: ${votes}%`}
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Redes Sociais */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Performance das Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialData.map((platform, index) => (
                  <div key={platform.platform} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{platform.platform}</div>
                        <div className="text-sm text-slate-400">
                          {platform.followers.toLocaleString()} seguidores
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">{platform.engagement}%</div>
                      <div className={`text-xs ${platform.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {platform.growth > 0 ? '+' : ''}{platform.growth}% crescimento
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engajamento por Horário */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Engajamento por Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#06B6D4" 
                    fill="url(#colorEngagement)"
                  />
                  <defs>
                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alertas e Notificações */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span>Alertas e Oportunidades</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-red-300">Alerta de Crise</div>
                  <div className="text-sm text-red-200/80">
                    Aumento de 45% em menções negativas sobre o projeto de lei X. Recomenda-se resposta imediata.
                  </div>
                  <div className="text-xs text-red-400 mt-1">Há 2 horas</div>
                </div>
                <Button size="sm" variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/20">
                  Ação
                </Button>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-green-300">Oportunidade</div>
                  <div className="text-sm text-green-200/80">
                    Trending topic "educação" com 50K menções. Momento ideal para divulgar suas propostas educacionais.
                  </div>
                  <div className="text-xs text-green-400 mt-1">Há 30 minutos</div>
                </div>
                <Button size="sm" variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/20">
                  Aproveitar
                </Button>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-blue-300">Insight</div>
                  <div className="text-sm text-blue-200/80">
                    Seus posts sobre saúde pública têm 3x mais engajamento. Considere aumentar a frequência deste conteúdo.
                  </div>
                  <div className="text-xs text-blue-400 mt-1">Há 1 hora</div>
                </div>
                <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-slate-400" />
              <span>Atividades Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: '14:30',
                  action: 'Nova pesquisa de intenção de voto publicada',
                  details: 'Resultado: 45.2% (+2.1%)',
                  icon: TrendingUp,
                  color: 'text-green-400'
                },
                {
                  time: '13:15',
                  action: 'Post no Instagram atingiu 10K curtidas',
                  details: 'Proposta sobre mobilidade urbana',
                  icon: Heart,
                  color: 'text-pink-400'
                },
                {
                  time: '12:00',
                  action: 'Agenda atualizada',
                  details: 'Reunião com lideranças comunitárias às 16h',
                  icon: Calendar,
                  color: 'text-blue-400'
                },
                {
                  time: '11:45',
                  action: 'Novo seguidor influente',
                  details: '@jornalista_local começou a seguir',
                  icon: Users,
                  color: 'text-cyan-400'
                },
                {
                  time: '10:30',
                  action: 'Menção em veículo de mídia',
                  details: 'Jornal Local destacou sua proposta',
                  icon: Share2,
                  color: 'text-yellow-400'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/20 rounded-lg">
                  <div className="flex-shrink-0">
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{activity.action}</div>
                    <div className="text-sm text-slate-400">{activity.details}</div>
                  </div>
                  <div className="text-xs text-slate-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
