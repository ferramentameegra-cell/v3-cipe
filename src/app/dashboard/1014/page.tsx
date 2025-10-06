'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Eye, MessageSquare, Heart,
  Target, Zap, AlertTriangle, CheckCircle, Clock, DollarSign,
  Share2, ThumbsUp, Calendar, MapPin, Smartphone, Monitor,
  Bell, Search, Settings, Menu, MoreHorizontal, Download,
  Plus, Filter, ChevronDown, ArrowUpDown, ArrowLeft, ArrowRight,
  Command, Brain, Shield, Vote, TrendingUp as TrendingUpIcon
} from 'lucide-react';
import OracleCipe from '@/components/OracleCipe';

// Dados do CIPE baseados no modelo Shadcn
const intencaoVotoData = [
  { month: 'Jan', intencao: 42, meta: 45 },
  { month: 'Fev', intencao: 38, meta: 45 },
  { month: 'Mar', intencao: 45, meta: 45 },
  { month: 'Abr', intencao: 48, meta: 45 },
  { month: 'Mai', intencao: 52, meta: 45 },
  { month: 'Jun', intencao: 55, meta: 45 }
];

const receitaData = [
  { month: 'Jan', receita: 120000, meta: 100000 },
  { month: 'Fev', receita: 95000, meta: 100000 },
  { month: 'Mar', receita: 140000, meta: 100000 },
  { month: 'Abr', receita: 130000, meta: 100000 },
  { month: 'Mai', receita: 160000, meta: 100000 },
  { month: 'Jun', receita: 155000, meta: 100000 }
];

const vendasPorRegiao = [
  { regiao: 'Norte', votos: 12500, porcentagem: 28, mudanca: 5.2 },
  { regiao: 'Sul', votos: 15800, porcentagem: 35, mudanca: 12.4 },
  { regiao: 'Leste', votos: 11200, porcentagem: 25, mudanca: -2.1 },
  { regiao: 'Oeste', votos: 8900, porcentagem: 20, mudanca: 8.7 },
  { regiao: 'Centro', votos: 5600, porcentagem: 12, mudanca: 3.5 }
];

const leadsRecentes = [
  { ref: 'L-1012', nome: 'Maria Silva', empresa: 'Associação Comercial', status: 'Qualificado', fonte: 'Website', ultimaAtividade: '30m atrás' },
  { ref: 'L-1018', nome: 'João Santos', empresa: 'Sindicato Rural', status: 'Qualificado', fonte: 'Website', ultimaAtividade: '35m atrás' },
  { ref: 'L-1005', nome: 'Ana Costa', empresa: 'Cooperativa', status: 'Negociação', fonte: 'Website', ultimaAtividade: '1h atrás' },
  { ref: 'L-1001', nome: 'Pedro Lima', empresa: 'Câmara Municipal', status: 'Qualificado', fonte: 'Website', ultimaAtividade: '2h atrás' },
  { ref: 'L-1003', nome: 'Carla Mendes', empresa: 'Sindicato dos Professores', status: 'Proposta Enviada', fonte: 'Redes Sociais', ultimaAtividade: '4h atrás' },
  { ref: 'L-1008', nome: 'Roberto Alves', empresa: 'Associação de Bairro', status: 'Contatado', fonte: 'Redes Sociais', ultimaAtividade: '5h atrás' },
  { ref: 'L-1016', nome: 'Fernanda Rocha', empresa: 'Clube de Serviço', status: 'Proposta Enviada', fonte: 'Indicação', ultimaAtividade: '7h atrás' },
  { ref: 'L-1007', nome: 'Carlos Oliveira', empresa: 'Sindicato dos Trabalhadores', status: 'Ganho', fonte: 'Website', ultimaAtividade: '6h atrás' },
  { ref: 'L-1011', nome: 'Patricia Souza', empresa: 'Associação de Moradores', status: 'Proposta Enviada', fonte: 'Indicação', ultimaAtividade: '10h atrás' },
  { ref: 'L-1014', nome: 'Marcos Ferreira', empresa: 'Conselho Municipal', status: 'Contatado', fonte: 'Redes Sociais', ultimaAtividade: '12h atrás' }
];

const itensAcao = [
  { titulo: 'Enviar propostas de lei', prioridade: 'Alta', descricao: 'Enviar documentos de propostas legislativas', prazo: 'Hoje' },
  { titulo: 'Reunião com lideranças', prioridade: 'Média', descricao: 'Agendar reunião com lideranças comunitárias', prazo: 'Amanhã' },
  { titulo: 'Atualizar site', prioridade: 'Baixa', descricao: 'Adicionar últimas realizações', prazo: 'Esta semana' }
];

export default function DashboardPage() {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Qualificado': return 'bg-green-100 text-green-800';
      case 'Negociação': return 'bg-yellow-100 text-yellow-800';
      case 'Proposta Enviada': return 'bg-blue-100 text-blue-800';
      case 'Contatado': return 'bg-gray-100 text-gray-800';
      case 'Ganho': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header fixo */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CIPE</h1>
                <p className="text-sm text-gray-500">Central de Inteligência Política e Eleitoral</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Pesquisar..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Ação
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="RN" />
                      <AvatarFallback>RN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Ronaldo Nogueira</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        ronaldo@deputado.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal com scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Oracle CIPE */}
          <OracleCipe />

          {/* Stats Cards baseados no modelo Shadcn */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Intenção de Voto</CardTitle>
                <Vote className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">55%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> do mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Propostas Enviadas</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.3%</span> do mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orçamento</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 2.5M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15.2%</span> do mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Apoios Conquistados</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">136</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">-2.5%</span> do mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid baseados no modelo Shadcn */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Intenção de Voto por Fonte */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Intenção de Voto por Fonte</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Ver Relatório Completo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={intencaoVotoData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="intencao" fill="#3b82f6" />
                    <Bar dataKey="meta" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Receita vs Meta */}
            <Card>
              <CardHeader>
                <CardTitle>Receita vs Meta</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Progresso médio: 78% · 2 projetos acima da meta
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={receitaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="receita" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="meta" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Pipeline de Vendas e Vendas por Região */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pipeline de Vendas */}
            <Card>
              <CardHeader>
                <CardTitle>Pipeline de Apoios</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Apoios aumentaram 18.2% desde o mês passado.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Prospectos</span>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Qualificados</span>
                    <span className="text-sm text-muted-foreground">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Proposta</span>
                    <span className="text-sm text-muted-foreground">18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Apoio Confirmado</span>
                    <span className="text-sm text-muted-foreground">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendas por Região */}
            <Card>
              <CardHeader>
                <CardTitle>Votos por Região</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendasPorRegiao.map((regiao, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <div>
                          <p className="text-sm font-medium">{regiao.regiao}</p>
                          <p className="text-xs text-muted-foreground">
                            {regiao.votos.toLocaleString()} votos · {regiao.porcentagem}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${regiao.mudanca > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {regiao.mudanca > 0 ? '+' : ''}{regiao.mudanca}%
                        </p>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <p className="text-xs text-muted-foreground">
                    5 regiões acompanhadas • 3 regiões crescendo
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Itens de Ação e Leads Recentes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Itens de Ação */}
            <Card>
              <CardHeader>
                <CardTitle>Itens de Ação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {itensAcao.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.titulo}</p>
                        <p className="text-xs text-muted-foreground">{item.descricao}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.prazo}</p>
                      </div>
                      <Badge variant="outline" className={getPriorityColor(item.prioridade)}>
                        {item.prioridade}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leads Recentes Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Leads Recentes</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Acompanhe e gerencie seus leads mais recentes e seus status.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Ref</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Nome</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Empresa</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Fonte</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Última Atividade</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadsRecentes.map((lead, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium">{lead.ref}</td>
                          <td className="py-3 px-4 text-sm">{lead.nome}</td>
                          <td className="py-3 px-4 text-sm">{lead.empresa}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={getStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{lead.fonte}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{lead.ultimaAtividade}</td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Excluir</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Paginação */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    0 de 15 linha(s) selecionada(s).
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">Linhas por página</p>
                    <Button variant="outline" size="sm">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">Página 1 de 2</p>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
