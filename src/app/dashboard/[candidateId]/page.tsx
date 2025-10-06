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
  Share2, ThumbsUp, Calendar, MapPin, Smartphone, Monitor,
  Bell, Search, Settings, Menu
} from 'lucide-react';
import OracleCipe from '@/components/OracleCipe';

// Dados simulados baseados no Modernize
const salesData = [
  { month: 'Jan', sales: 4000, target: 3500 },
  { month: 'Fev', sales: 3000, target: 3500 },
  { month: 'Mar', sales: 5000, target: 3500 },
  { month: 'Abr', sales: 4500, target: 3500 },
  { month: 'Mai', sales: 6000, target: 3500 },
  { month: 'Jun', sales: 5500, target: 3500 }
];

const yearlyBreakup = [
  { name: '2024', value: 25000, color: '#3b82f6' },
  { name: '2025', value: 36358, color: '#10b981' }
];

const monthlyEarnings = [
  { month: 'Jan', earnings: 5000 },
  { month: 'Fev', earnings: 5500 },
  { month: 'Mar', earnings: 6000 },
  { month: 'Abr', earnings: 6500 },
  { month: 'Mai', earnings: 7000 },
  { month: 'Jun', earnings: 6820 }
];

const productPerformance = [
  { id: 1, assigned: 'Sunil Joshi', name: 'Elite Admin', priority: 'Low', budget: '$3.9k' },
  { id: 2, assigned: 'Andrew McDownland', name: 'Real Homes WP Theme', priority: 'Medium', budget: '$24.5k' },
  { id: 3, assigned: 'Christopher Jamil', name: 'MedicalPro WP Theme', priority: 'High', budget: '$12.8k' },
  { id: 4, assigned: 'Nirav Joshi', name: 'Hosting Press HTML', priority: 'Critical', budget: '$2.4k' }
];

const recentTransactions = [
  { time: '09:30 am', description: 'Payment received from John Doe of $385.90', type: 'payment' },
  { time: '10:00 am', description: 'New sale recorded #ML-3467', type: 'sale' },
  { time: '12:00 am', description: 'Payment was made of $64.95 to Michael', type: 'payment' },
  { time: '09:30 am', description: 'New sale recorded #ML-3467', type: 'sale' },
  { time: '09:30 am', description: 'New arrival recorded', type: 'arrival' },
  { time: '12:00 am', description: 'Payment Received', type: 'payment' }
];

const products = [
  { name: 'Boat Headphone', price: 285, originalPrice: 375 },
  { name: 'MacBook Air Pro', price: 900, originalPrice: 650 },
  { name: 'Red Valvet Dress', price: 200, originalPrice: 150 },
  { name: 'Cute Soft Teddybear', price: 345, originalPrice: 285 }
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

  const StatCard = ({ title, value, change, icon: Icon, trend, color = "primary" }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="modernize-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <div className="flex items-center space-x-1">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-success-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-danger-500" />
                )}
                <span className={`text-sm ${trend === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
                  {change}
                </span>
                <span className="text-sm text-gray-500">vs. mês anterior</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${color}-100`}>
              <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header baseado no Modernize */}
      <div className="modernize-header">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RN</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Ronaldo Nogueira</h1>
                  <p className="text-sm text-gray-500">Deputado Federal - 1014</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              <div className="relative">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 bg-danger-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    3
                  </Badge>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Oracle CIPE */}
        <OracleCipe />

        {/* Stats Cards baseados no Modernize */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Sales Overview"
            value="March 2025"
            change="+9%"
            trend="up"
            icon={Target}
            color="primary"
          />
          <StatCard
            title="Yearly Breakup"
            value="$36,358"
            change="+9%"
            trend="up"
            icon={DollarSign}
            color="success"
          />
          <StatCard
            title="Monthly Earnings"
            value="$6,820"
            change="+9%"
            trend="up"
            icon={TrendingUp}
            color="warning"
          />
          <StatCard
            title="Recent Transactions"
            value="6"
            change="+12%"
            trend="up"
            icon={MessageSquare}
            color="accent"
          />
        </div>

        {/* Charts Grid baseado no Modernize */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Overview Chart */}
          <Card className="modernize-card">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Vendas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Meta"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Yearly Breakup */}
          <Card className="modernize-card">
            <CardHeader>
              <CardTitle>Yearly Breakup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">$36,358</div>
                  <div className="text-sm text-gray-500">+9% last year</div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={yearlyBreakup}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                    >
                      {yearlyBreakup.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Earnings */}
          <Card className="modernize-card">
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#3b82f6" 
                    fill="url(#colorEarnings)"
                  />
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="modernize-card">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.type === 'payment' ? 'bg-success-500' :
                        transaction.type === 'sale' ? 'bg-primary-500' :
                        'bg-warning-500'
                      }`}></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-xs text-gray-500">{transaction.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Performance Table */}
        <Card className="modernize-card">
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Id</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Assigned</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {productPerformance.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{product.id}</td>
                      <td className="py-3 px-4 text-gray-900">{product.assigned}</td>
                      <td className="py-3 px-4 text-gray-900">{product.name}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={
                            product.priority === 'Low' ? 'secondary' :
                            product.priority === 'Medium' ? 'warning' :
                            product.priority === 'High' ? 'danger' : 'danger'
                          }
                        >
                          {product.priority}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{product.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="modernize-card">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                  <div className="text-2xl font-bold text-primary-600">${product.price}</div>
                  <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
