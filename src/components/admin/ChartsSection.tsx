
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

const visitDataByPeriod = {
  day: [
    { name: '00:00', visits: 12 },
    { name: '04:00', visits: 5 },
    { name: '08:00', visits: 25 },
    { name: '12:00', visits: 45 },
    { name: '16:00', visits: 35 },
    { name: '20:00', visits: 28 },
  ],
  week: [
    { name: 'Segunda', visits: 65 },
    { name: 'Terça', visits: 78 },
    { name: 'Quarta', visits: 90 },
    { name: 'Quinta', visits: 61 },
    { name: 'Sexta', visits: 85 },
    { name: 'Sábado', visits: 40 },
    { name: 'Domingo', visits: 35 },
  ],
  month: [
    { name: 'Sem 1', visits: 320 },
    { name: 'Sem 2', visits: 450 },
    { name: 'Sem 3', visits: 380 },
    { name: 'Sem 4', visits: 520 },
  ],
  year: [
    { name: 'Jan', visits: 1200 },
    { name: 'Fev', visits: 1400 },
    { name: 'Mar', visits: 1100 },
    { name: 'Abr', visits: 1600 },
    { name: 'Mai', visits: 1350 },
    { name: 'Jun', visits: 1800 },
    { name: 'Jul', visits: 1750 },
    { name: 'Ago', visits: 1900 },
    { name: 'Set', visits: 1650 },
    { name: 'Out', visits: 2100 },
    { name: 'Nov', visits: 1950 },
    { name: 'Dez', visits: 2200 },
  ]
};

const categoryData = [
  { label: 'Imunização Infantil', value: 75 },
  { label: 'Campanhas', value: 62 },
  { label: 'Documentação Técnica', value: 48 },
  { label: 'Treinamentos', value: 35 },
];

export function ChartsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const { themeColors, isDarkMode } = useTheme();

  const periods = [
    { key: 'day', label: 'Dia' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' }
  ];

  const lineColor = isDarkMode ? '#FFFFFF' : themeColors.primary;
  const gridColor = isDarkMode ? '#374151' : '#E5E7EB';
  const textColor = isDarkMode ? '#FFFFFF' : '#374151';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Line Chart */}
      <Card className="lg:col-span-8 animate-fade-in shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-gray-900 dark:text-white">Visitas por {periods.find(p => p.key === selectedPeriod)?.label}</CardTitle>
            <div className="flex space-x-2">
              {periods.map((period) => (
                <Button
                  key={period.key}
                  variant={selectedPeriod === period.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.key as any)}
                  style={selectedPeriod === period.key ? {
                    backgroundColor: themeColors.primary,
                    color: '#FFFFFF'
                  } : {
                    borderColor: themeColors.primary,
                    color: themeColors.primary
                  }}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitDataByPeriod[selectedPeriod]}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" tick={{ fill: textColor }} />
              <YAxis tick={{ fill: textColor }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '8px',
                  color: textColor
                }}
              />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke={lineColor}
                strokeWidth={2}
                dot={{ fill: lineColor }}
                activeDot={{ r: 6, fill: lineColor }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Progress Bars */}
      <Card className="lg:col-span-4 animate-fade-in shadow-lg">
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
                <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                <span className="text-gray-900 dark:text-white">{item.value}%</span>
              </div>
              <Progress 
                value={item.value} 
                className="h-2"
                style={{
                  '--progress-background': themeColors.primary
                } as React.CSSProperties}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
