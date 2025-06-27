
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const visitData = [
  { name: 'Segunda', visits: 65 },
  { name: 'Terça', visits: 78 },
  { name: 'Quarta', visits: 90 },
  { name: 'Quinta', visits: 61 },
  { name: 'Sexta', visits: 85 },
  { name: 'Sábado', visits: 40 },
  { name: 'Domingo', visits: 35 },
];

const categoryData = [
  { label: 'Imunização Infantil', value: 75 },
  { label: 'Campanhas', value: 62 },
  { label: 'Documentação Técnica', value: 48 },
  { label: 'Treinamentos', value: 35 },
];

function AnimatedProgress({ value, delay = 0 }: { value: number; delay?: number }) {
  const [animatedValue, setAnimatedValue] = useState(0);

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

  return <Progress value={animatedValue} className="h-2" />;
}

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Line Chart */}
      <Card className="lg:col-span-8 shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle>Visitas por Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="#0037C1" 
                strokeWidth={2}
                dot={{ fill: '#0037C1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Progress Bars */}
      <Card className="lg:col-span-4 shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle>Downloads por Categoria</CardTitle>
          <p className="text-sm text-gray-500">
            Categorias mais acessadas este mês
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {categoryData.map((item, index) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <AnimatedProgress value={item.value} delay={index * 200} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
