
import { Users, BarChart, TrendingUp, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    title: 'Total de Usuários',
    metric: '1,245',
    change: '+10.1%',
    icon: Users,
    color: 'text-green-600',
  },
  {
    title: 'Documentos Ativos',
    metric: '684',
    change: '+5.2%',
    icon: BarChart,
    color: 'text-green-600',
  },
  {
    title: 'Downloads',
    metric: '24,532',
    change: '+19.5%',
    icon: TrendingUp,
    color: 'text-green-600',
  },
  {
    title: 'Acesso Recente',
    metric: '15',
    description: 'usuários hoje',
    icon: CalendarDays,
    color: 'text-green-600',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.metric}</div>
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
