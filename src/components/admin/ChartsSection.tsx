
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

const dataByPeriod = {
  visits: {
    day: [
      { name: '00:00', value: 12 },
      { name: '04:00', value: 5 },
      { name: '08:00', value: 25 },
      { name: '12:00', value: 45 },
      { name: '16:00', value: 35 },
      { name: '20:00', value: 28 },
    ],
    week: [
      { name: 'Segunda', value: 65 },
      { name: 'Terça', value: 78 },
      { name: 'Quarta', value: 90 },
      { name: 'Quinta', value: 61 },
      { name: 'Sexta', value: 85 },
      { name: 'Sábado', value: 40 },
      { name: 'Domingo', value: 35 },
    ],
    month: [
      { name: 'Sem 1', value: 320 },
      { name: 'Sem 2', value: 450 },
      { name: 'Sem 3', value: 380 },
      { name: 'Sem 4', value: 520 },
    ],
    year: [
      { name: 'Jan', value: 1200 },
      { name: 'Fev', value: 1400 },
      { name: 'Mar', value: 1100 },
      { name: 'Abr', value: 1600 },
      { name: 'Mai', value: 1350 },
      { name: 'Jun', value: 1800 },
      { name: 'Jul', value: 1750 },
      { name: 'Ago', value: 1900 },
      { name: 'Set', value: 1650 },
      { name: 'Out', value: 2100 },
      { name: 'Nov', value: 1950 },
      { name: 'Dez', value: 2200 },
    ]
  },
  downloads: {
    day: [
      { name: '00:00', value: 8 },
      { name: '04:00', value: 3 },
      { name: '08:00', value: 18 },
      { name: '12:00', value: 32 },
      { name: '16:00', value: 28 },
      { name: '20:00', value: 15 },
    ],
    week: [
      { name: 'Segunda', value: 42 },
      { name: 'Terça', value: 55 },
      { name: 'Quarta', value: 68 },
      { name: 'Quinta', value: 38 },
      { name: 'Sexta', value: 72 },
      { name: 'Sábado', value: 28 },
      { name: 'Domingo', value: 22 },
    ],
    month: [
      { name: 'Sem 1', value: 245 },
      { name: 'Sem 2', value: 320 },
      { name: 'Sem 3', value: 285 },
      { name: 'Sem 4', value: 410 },
    ],
    year: [
      { name: 'Jan', value: 890 },
      { name: 'Fev', value: 1050 },
      { name: 'Mar', value: 820 },
      { name: 'Abr', value: 1200 },
      { name: 'Mai', value: 980 },
      { name: 'Jun', value: 1350 },
      { name: 'Jul', value: 1220 },
      { name: 'Ago', value: 1420 },
      { name: 'Set', value: 1180 },
      { name: 'Out', value: 1580 },
      { name: 'Nov', value: 1380 },
      { name: 'Dez', value: 1650 },
    ]
  }
};

const categoryData = [
  { label: 'Imunização Infantil', value: 75 },
  { label: 'Campanhas', value: 62 },
  { label: 'Documentação Técnica', value: 48 },
  { label: 'Treinamentos', value: 35 },
];

export function ChartsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [selectedMetric, setSelectedMetric] = useState<'visits' | 'downloads'>('visits');
  const { themeColors, isDarkMode } = useTheme();

  const periods = [
    { key: 'day', label: 'Dia' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' }
  ];

  const lineColor = isDarkMode ? '#FFFFFF' : themeColors.primary;
  const lineColorOpacity = selectedMetric === 'downloads' ? 0.85 : 1;
  const gridColor = isDarkMode ? '#374151' : '#E5E7EB';
  const textColor = isDarkMode ? '#FFFFFF' : '#374151';
  
  const currentData = dataByPeriod[selectedMetric][selectedPeriod];
  const totalCount = currentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Line Chart */}
      <Card className="lg:col-span-8 animate-fade-in shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-gray-900 dark:text-white">
              {selectedMetric === 'visits' ? 'Visitas' : 'Downloads'} por {periods.find(p => p.key === selectedPeriod)?.label}
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">({totalCount.toLocaleString()} total)</span>
            </CardTitle>
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
            <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: textColor, fontSize: 12 }}
                angle={selectedPeriod === 'week' ? -45 : 0}
                textAnchor={selectedPeriod === 'week' ? 'end' : 'middle'}
                height={selectedPeriod === 'week' ? 60 : 30}
              />
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
                dataKey="value" 
                stroke={lineColor}
                strokeWidth={2}
                strokeOpacity={lineColorOpacity}
                dot={{ fill: lineColor, fillOpacity: lineColorOpacity }}
                activeDot={{ r: 6, fill: lineColor, fillOpacity: lineColorOpacity }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Metric Toggle Buttons */}
          <div className="flex justify-center space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant={selectedMetric === 'visits' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric('visits')}
              style={selectedMetric === 'visits' ? {
                backgroundColor: themeColors.primary,
                color: '#FFFFFF'
              } : {
                borderColor: themeColors.primary,
                color: themeColors.primary
              }}
            >
              Visitas
            </Button>
            <Button
              variant={selectedMetric === 'downloads' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric('downloads')}
              style={selectedMetric === 'downloads' ? {
                backgroundColor: themeColors.primary,
                color: '#FFFFFF',
                opacity: 0.85
              } : {
                borderColor: themeColors.primary,
                color: themeColors.primary,
                opacity: 0.85
              }}
            >
              Downloads
            </Button>
          </div>
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
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full transition-all duration-300 ease-in-out rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: themeColors.primary
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
