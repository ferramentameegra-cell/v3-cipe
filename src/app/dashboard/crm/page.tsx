'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Plus, Filter, ChevronDown, ArrowUpDown, ArrowLeft, ArrowRight
} from 'lucide-react';

// Dados baseados no Shadcn Admin Dashboard
const leadsData = [
  { name: 'Jan', leads: 400, qualified: 300 },
  { name: 'Feb', leads: 300, qualified: 250 },
  { name: 'Mar', leads: 500, qualified: 400 },
  { name: 'Apr', leads: 450, qualified: 350 },
  { name: 'May', leads: 600, qualified: 500 },
  { name: 'Jun', leads: 550, qualified: 450 }
];

const revenueData = [
  { month: 'Jan', revenue: 4000, target: 3500 },
  { month: 'Feb', revenue: 3000, target: 3500 },
  { month: 'Mar', revenue: 5000, target: 3500 },
  { month: 'Apr', revenue: 4500, target: 3500 },
  { month: 'May', revenue: 6000, target: 3500 },
  { month: 'Jun', revenue: 5500, target: 3500 }
];

const salesByRegion = [
  { region: 'North America', revenue: 123500, percentage: 31, change: -3.2 },
  { region: 'Europe', revenue: 40100, percentage: 34, change: 9.4 },
  { region: 'Asia Pacific', revenue: 30950, percentage: 26, change: 12.8 },
  { region: 'Latin America', revenue: 12200, percentage: 7, change: -1.7 },
  { region: 'Middle East & Africa', revenue: 2450, percentage: 2, change: 6.0 }
];

const recentLeads = [
  { ref: 'L-1012', name: 'Guillermo Rauch', company: 'Vercel', status: 'Qualified', source: 'Website', lastActivity: '30m ago' },
  { ref: 'L-1018', name: 'Nizzy', company: 'Mail0', status: 'Qualified', source: 'Website', lastActivity: '35m ago' },
  { ref: 'L-1005', name: 'Sahaj', company: 'Tweakcn', status: 'Negotiation', source: 'Website', lastActivity: '1h ago' },
  { ref: 'L-1001', name: 'Shadcn', company: 'Shadcn/ui', status: 'Qualified', source: 'Website', lastActivity: '2h ago' },
  { ref: 'L-1003', name: 'Sam Altman', company: 'OpenAI', status: 'Proposal Sent', source: 'Social Media', lastActivity: '4h ago' },
  { ref: 'L-1008', name: 'Michael Andreuzza', company: 'Lexington Themes', status: 'Contacted', source: 'Social Media', lastActivity: '5h ago' },
  { ref: 'L-1016', name: 'Skyleen', company: 'Animate UI', status: 'Proposal Sent', source: 'Referral', lastActivity: '7h ago' },
  { ref: 'L-1007', name: 'Arham Khan', company: 'Weblabs Studio', status: 'Won', source: 'Website', lastActivity: '6h ago' },
  { ref: 'L-1011', name: 'Sebastian Rindom', company: 'Medusa', status: 'Proposal Sent', source: 'Referral', lastActivity: '10h ago' },
  { ref: 'L-1014', name: 'Fred K. Schott', company: 'Astro', status: 'Contacted', source: 'Social Media', lastActivity: '12h ago' }
];

const actionItems = [
  { title: 'Send kickoff docs', priority: 'High', description: 'Send onboarding documents and timeline', due: 'Due today' },
  { title: 'Demo call for SaaS MVP', priority: 'Medium', description: 'Book Zoom call with client', due: 'Due tomorrow' },
  { title: 'Update case study', priority: 'Low', description: 'Add latest LLM project', due: 'Due this week' }
];

export default function CRMDashboard() {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'Negotiation': return 'bg-yellow-100 text-yellow-800';
      case 'Proposal Sent': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-gray-100 text-gray-800';
      case 'Won': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Studio Admin</h1>
                <p className="text-sm text-gray-500">CRM Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Quick Create
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="AK" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Arham Khan</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        hello@arhamkhnz.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">635</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+54.6%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proposals Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$56,050</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+22.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects Won</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">136</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">-2.5%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads by Source */}
          <Card>
            <CardHeader>
              <CardTitle>Leads by Source</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  View Full Report
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leadsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#3b82f6" />
                  <Bar dataKey="qualified" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Project Revenue vs Target */}
          <Card>
            <CardHeader>
              <CardTitle>Project Revenue vs Target</CardTitle>
              <p className="text-sm text-muted-foreground">
                Average progress: 78% · 2 projects above target
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sales Pipeline and Sales by Region */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
              <p className="text-sm text-muted-foreground">
                Leads increased by 18.2% since last month.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prospects</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Qualified</span>
                  <span className="text-sm text-muted-foreground">32%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Proposal</span>
                  <span className="text-sm text-muted-foreground">18%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Closed Won</span>
                  <span className="text-sm text-muted-foreground">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales by Region */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesByRegion.map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      <div>
                        <p className="text-sm font-medium">{region.region}</p>
                        <p className="text-xs text-muted-foreground">
                          ${region.revenue.toLocaleString()} · {region.percentage}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${region.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {region.change > 0 ? '+' : ''}{region.change}%
                      </p>
                    </div>
                  </div>
                ))}
                <Separator />
                <p className="text-xs text-muted-foreground">
                  5 regions tracked • 3 regions growing
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items and Recent Leads */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.due}</p>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Leads Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Leads</CardTitle>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">
                    Track and manage your latest leads and their status.
                  </p>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
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
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Source</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Last Activity</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{lead.ref}</td>
                        <td className="py-3 px-4 text-sm">{lead.name}</td>
                        <td className="py-3 px-4 text-sm">{lead.company}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{lead.source}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{lead.lastActivity}</td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  0 of 15 row(s) selected.
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">Rows per page</p>
                  <Button variant="outline" size="sm">
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">Page 1 of 2</p>
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
  );
}
