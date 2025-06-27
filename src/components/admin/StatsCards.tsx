
import { useState, useEffect } from 'react';
import { Users, BarChart, TrendingUp, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';

const stats = [
  {
    title: 'Total de Usuários',
    metric: 1245,
    change: '+10.1%',
    icon: Users,
    color: 'text-green-600',
  },
  {
    title: 'Documentos Ativos',
    metric: 684,
    change: '+5.2%',
    icon: BarChart,
    color: 'text-green-600',
  },
  {
    title: 'Downloads',
    metric: 24532,
    change: '+19.5%',
    icon: TrendingUp,
    color: 'text-green-600',
  },
  {
    title: 'Acesso Recente',
    metric: 15,
    description: 'usuários hoje',
    icon: CalendarDays,
    color: 'text-green-600',
  },
];

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(value * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export function StatsCards() {
  const { themeColors } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="shadow-lg animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="relative">
                <Badge 
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center"
                  style={{ backgroundColor: themeColors.primary }}
                >
                  <Icon className="h-3 w-3 text-white" />
                </Badge>
                <Icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <AnimatedNumber value={stat.metric} />
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {stat.change && (
                  <span className={stat.color}>
                    {stat.change}
                  </span>
                )}
                {stat.description && (
                  <span>{stat.description}</span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
