
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

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Line Chart */}
      <Card className="lg:col-span-8 shadow-lg">
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
      <Card className="lg:col-span-4 shadow-lg">
        <CardHeader>
          <CardTitle>Downloads por Categoria</CardTitle>
          <p className="text-sm text-gray-500">
            Categorias mais acessadas este mês
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {categoryData.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
