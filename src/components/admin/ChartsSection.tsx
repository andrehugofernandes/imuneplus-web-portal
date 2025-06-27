
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

const visitDataDaily = [
  { name: 'Segunda', visits: 65 },
  { name: 'Terça', visits: 78 },
  { name: 'Quarta', visits: 90 },
  { name: 'Quinta', visits: 61 },
  { name: 'Sexta', visits: 85 },
  { name: 'Sábado', visits: 40 },
  { name: 'Domingo', visits: 35 },
];

const visitDataWeekly = [
  { name: 'Sem 1', visits: 420 },
  { name: 'Sem 2', visits: 350 },
  { name: 'Sem 3', visits: 480 },
  { name: 'Sem 4', visits: 390 },
];

const visitDataMonthly = [
  { name: 'Jan', visits: 1200 },
  { name: 'Fev', visits: 980 },
  { name: 'Mar', visits: 1450 },
  { name: 'Abr', visits: 1100 },
  { name: 'Mai', visits: 1650 },
  { name: 'Jun', visits: 1300 },
];

const visitDataYearly = [
  { name: '2020', visits: 12000 },
  { name: '2021', visits: 15000 },
  { name: '2022', visits: 18000 },
  { name: '2023', visits: 22000 },
  { name: '2024', visits: 25000 },
];

const categoryData = [
  { label: 'Imunização Infantil', value: 75 },
  { label: 'Campanhas', value: 62 },
  { label: 'Documentação Técnica', value: 48 },
  { label: 'Treinamentos', value: 35 },
];

function AnimatedProgress({ value, delay = 0 }: { value: number; delay?: number }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const { themeColors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setAnimatedValue(value * easeOutQuart);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div 
        className="h-2 rounded-full transition-all duration-300"
        style={{ 
          width: `${animatedValue}%`,
          backgroundColor: themeColors.primary
        }}
      />
    </div>
  );
}

export function ChartsSection() {
  const { themeColors, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('daily');

  const getVisitData = () => {
    switch (activeTab) {
      case 'weekly': return visitDataWeekly;
      case 'monthly': return visitDataMonthly;
      case 'yearly': return visitDataYearly;
      default: return visitDataDaily;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'weekly': return 'Visitas por Semana';
      case 'monthly': return 'Visitas por Mês';
      case 'yearly': return 'Visitas por Ano';
      default: return 'Visitas por Dia';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Line Chart with Tabs */}
      <Card className="lg:col-span-8 shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle>{getTabTitle()}</CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="daily">Por Dia</TabsTrigger>
              <TabsTrigger value="weekly">Por Semana</TabsTrigger>
              <TabsTrigger value="monthly">Por Mês</TabsTrigger>
              <TabsTrigger value="yearly">Por Ano</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getVisitData()}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                  />
                  <YAxis 
                    stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                      border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                      borderRadius: '8px',
                      color: isDarkMode ? '#F9FAFB' : '#111827'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visits" 
                    stroke={themeColors.primary}
                    strokeWidth={3}
                    dot={{ fill: themeColors.primary, strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: themeColors.primaryHover }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>

      {/* Progress Bars */}
      <Card className="lg:col-span-4 shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Downloads por Categoria</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Categorias mais acessadas este mês
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {categoryData.map((item, index) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                <span className="text-gray-600 dark:text-gray-400">{item.value}%</span>
              </div>
              <AnimatedProgress value={item.value} delay={index * 200} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
