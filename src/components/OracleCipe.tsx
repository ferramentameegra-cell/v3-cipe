'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, Send, Mic, MicOff, Volume2, VolumeX, 
  Zap, TrendingUp, Users, AlertTriangle, CheckCircle,
  Loader2, Sparkles, MessageSquare
} from 'lucide-react';

interface OracleMessage {
  id: string;
  type: 'user' | 'oracle';
  content: string;
  timestamp: Date;
  category?: 'analysis' | 'recommendation' | 'alert' | 'insight';
}

export default function OracleCipe() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<OracleMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const oracleResponses = {
    'intenção de voto': {
      category: 'analysis' as const,
      content: '📊 **Análise de Intenção de Voto**\\n\\nBaseado nos dados mais recentes:\\n• Sua intenção de voto está em **45.2%** (+3% vs. mês anterior)\\n• Principal concorrente: 38.1% (-1%)\\n• Indecisos: 16.7%\\n\\n🎯 **Recomendações:**\\n• Intensificar campanha nos bairros periféricos\\n• Focar em propostas para jovens (18-25 anos)\\n• Aumentar presença digital no Instagram'
    },
    'redes sociais': {
      category: 'insight' as const,
      content: '📱 **Análise de Redes Sociais**\\n\\n**Performance Atual:**\\n• Instagram: 128K seguidores (+15% mês)\\n• Facebook: 89K seguidores (+8% mês)\\n• TikTok: 45K seguidores (+32% mês)\\n\\n**Engajamento:**\\n• Taxa média: 8.5%\\n• Melhor horário: 19h-21h\\n• Conteúdo top: Vídeos curtos sobre propostas\\n\\n💡 **Oportunidades:**\\n• Criar série "Conversa com o Deputado"\\n• Aumentar frequência no TikTok\\n• Parcerias com influenciadores locais'
    },
    'adversários': {
      category: 'alert' as const,
      content: '⚠️ **Monitoramento de Adversários**\\n\\n**Atividade Recente:**\\n• João Silva: Lançou campanha sobre segurança\\n• Maria Santos: Aumentou investimento em digital\\n• Pedro Costa: Agenda intensa no interior\\n\\n🛡️ **Ameaças Identificadas:**\\n• Possível ataque sobre projeto X\\n• Narrativa negativa sobre orçamento\\n\\n🎯 **Contra-estratégias:**\\n• Preparar defesa proativa\\n• Destacar realizações concretas\\n• Antecipar narrativa positiva'
    },
    'orçamento': {
      category: 'recommendation' as const,
      content: '💰 **Análise de Orçamento de Campanha**\\n\\n**Situação Atual:**\\n• Orçamento total: R$ 2.5M\\n• Gasto até agora: R$ 1.2M (48%)\\n• Restante: R$ 1.3M\\n\\n**Distribuição Recomendada:**\\n• Digital (40%): R$ 520K\\n• TV/Rádio (30%): R$ 390K\\n• Material gráfico (20%): R$ 260K\\n• Eventos (10%): R$ 130K\\n\\n📈 **ROI por Canal:**\\n• Digital: 4.2x\\n• TV: 2.8x\\n• Rádio: 3.1x\\n• Outdoor: 1.9x'
    }
  };

  const getRandomResponse = () => {
    const responses = [
      {
        category: 'insight' as const,
        content: '💡 **Insight Estratégico**\\n\\nIdentifiquei uma oportunidade importante: o tema "educação" está em alta nas pesquisas (+23% de menções). Recomendo criar conteúdo focado em suas propostas educacionais para aproveitar este momento.'
      },
      {
        category: 'analysis' as const,
        content: '📊 **Análise em Tempo Real**\\n\\nSuas métricas estão evoluindo positivamente:\\n• Menções positivas: +18%\\n• Alcance orgânico: +25%\\n• Engajamento: +12%\\n\\nContinue com a estratégia atual!'
      },
      {
        category: 'recommendation' as const,
        content: '🎯 **Recomendação Personalizada**\\n\\nBaseado no seu perfil e histórico, sugiro focar nos próximos 7 dias em:\\n• 3 posts sobre saúde pública\\n• 2 vídeos sobre economia local\\n• 1 live sobre participação cidadã'
      }
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: OracleMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Buscar resposta baseada na mensagem
    const lowerMessage = message.toLowerCase();
    let response = getRandomResponse();

    for (const [key, value] of Object.entries(oracleResponses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    const oracleMessage: OracleMessage = {
      id: (Date.now() + 1).toString(),
      type: 'oracle',
      content: response.content,
      category: response.category,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, oracleMessage]);
    setIsLoading(false);
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'analysis': return <TrendingUp className="w-4 h-4" />;
      case 'recommendation': return <Zap className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'insight': return <Sparkles className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'analysis': return 'border-blue-500/30 bg-blue-500/10 text-blue-300';
      case 'recommendation': return 'border-green-500/30 bg-green-500/10 text-green-300';
      case 'alert': return 'border-red-500/30 bg-red-500/10 text-red-300';
      case 'insight': return 'border-purple-500/30 bg-purple-500/10 text-purple-300';
      default: return 'border-gray-500/30 bg-gray-500/10 text-gray-300';
    }
  };

  return (
    <Card className="glass-card mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Oracle CIPE</h3>
              <p className="text-xs text-slate-400">Inteligência Artificial Política</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsListening(!isListening)}
              className={`${isListening ? 'text-red-400' : 'text-slate-400'} hover:text-white`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={`${isSpeaking ? 'text-blue-400' : 'text-slate-400'} hover:text-white`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-64 overflow-y-auto mb-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  msg.type === 'user' 
                    ? 'bg-blue-600/20 border border-blue-500/30' 
                    : 'bg-slate-800/50 border border-slate-600/30'
                } rounded-lg p-3`}>
                  {msg.type === 'oracle' && msg.category && (
                    <Badge className={`mb-2 ${getCategoryColor(msg.category)}`}>
                      {getCategoryIcon(msg.category)}
                      <span className="ml-1 capitalize">{msg.category}</span>
                    </Badge>
                  )}
                  <div className={`text-sm ${msg.type === 'user' ? 'text-blue-100' : 'text-slate-200'}`}>
                    {msg.content.split('\\n').map((line, i) => (
                      <div key={i} className={line.startsWith('•') ? 'ml-4' : ''}>
                        {line.startsWith('**') && line.endsWith('**') ? (
                          <strong className="text-white">{line.slice(2, -2)}</strong>
                        ) : line.startsWith('•') ? (
                          <span className="text-slate-300">{line}</span>
                        ) : (
                          line
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span className="text-sm text-slate-300">Oracle está analisando...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            placeholder="Como posso ajudar hoje? Digite sua pergunta..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !message.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            'Intenção de voto',
            'Performance redes sociais', 
            'Análise adversários',
            'Orçamento campanha'
          ].map((suggestion) => (
            <Button
              key={suggestion}
              variant="ghost"
              size="sm"
              onClick={() => setMessage(suggestion)}
              className="text-xs text-slate-400 hover:text-white border border-slate-600/30 hover:border-slate-500/50"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
