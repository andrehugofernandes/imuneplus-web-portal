import { List, Filter, Download, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminLogs() {
  const logs = [
    { id: 1, type: 'info', message: 'Usuário admin fez login', time: '10:30:25', date: '2024-06-25' },
    { id: 2, type: 'warning', message: 'Tentativa de login falhada', time: '10:25:10', date: '2024-06-25' },
    { id: 3, type: 'success', message: 'Backup realizado com sucesso', time: '09:15:00', date: '2024-06-25' },
    { id: 4, type: 'error', message: 'Erro na conexão com banco de dados', time: '08:45:30', date: '2024-06-25' },
  ];

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogBadge = (type: string) => {
    const colors = {
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Logs do Sistema
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitore atividades e eventos do sistema
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <List className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Logs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Erros</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">128</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Info className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Alertas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">512</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sucessos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,816</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs List */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Logs Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center space-x-4">
                  {getLogIcon(log.type)}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{log.message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{log.date} às {log.time}</p>
                  </div>
                </div>
                <Badge className={getLogBadge(log.type)}>
                  {log.type.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
