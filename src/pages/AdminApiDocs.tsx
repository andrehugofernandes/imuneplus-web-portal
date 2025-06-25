import { FileText, Code, Copy, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminApiDocs() {
  const endpoints = [
    { method: 'GET', path: '/api/users', description: 'Listar todos os usuários', status: 'active' },
    { method: 'POST', path: '/api/users', description: 'Criar novo usuário', status: 'active' },
    { method: 'GET', path: '/api/files', description: 'Listar arquivos', status: 'active' },
    { method: 'POST', path: '/api/files/upload', description: 'Upload de arquivo', status: 'beta' },
  ];

  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[method as keyof typeof colors] || colors.GET;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Documentação da API
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Referência completa da API do sistema IMUNE+
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <ExternalLink className="mr-2 h-4 w-4" />
          Swagger UI
        </Button>
      </div>

      {/* API Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Endpoints</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Endpoints Ativos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Documentação</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Completa</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Base URL */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Base URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">https://api.imune.gov.br/v1</span>
              <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Endpoints Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge className={getMethodColor(endpoint.method)}>
                    {endpoint.method}
                  </Badge>
                  <div>
                    <code className="font-mono text-sm text-gray-900 dark:text-gray-100">{endpoint.path}</code>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{endpoint.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={endpoint.status === 'active' ? 'default' : 'secondary'} 
                         className={endpoint.status === 'active' 
                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                           : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}>
                    {endpoint.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
