
import { useState } from 'react';
import { Code, Book, Download, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminApiDocs() {
  const [copiedEndpoints, setCopiedEndpoints] = useState<Record<string, boolean>>({});
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const copyToClipboard = (text: string, endpointId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoints({ ...copiedEndpoints, [endpointId]: true });
    setTimeout(() => {
      setCopiedEndpoints({ ...copiedEndpoints, [endpointId]: false });
    }, 2000);
  };

  const endpoints = [
    {
      id: 'users',
      method: 'GET',
      path: '/api/users',
      description: 'Listar todos os usuários',
      response: `{
  "data": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "role": "Admin"
    }
  ]
}`
    },
    {
      id: 'create-user',
      method: 'POST',
      path: '/api/users',
      description: 'Criar novo usuário',
      response: `{
  "message": "Usuário criado com sucesso",
  "data": {
    "id": 2,
    "name": "Maria Santos",
    "email": "maria@exemplo.com"
  }
}`
    },
    {
      id: 'files',
      method: 'GET',
      path: '/api/files',
      description: 'Listar arquivos',
      response: `{
  "data": [
    {
      "id": 1,
      "name": "documento.pdf",
      "size": "2.5MB",
      "category": "Imunização"
    }
  ]
}`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Documentação da API
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Documentação completa dos endpoints da API
          </p>
        </div>
        <Button 
          className="transition-colors"
          style={{ 
            backgroundColor: themeColors.primary,
            color: textColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = themeColors.primaryHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = themeColors.primary;
          }}
        >
          <Download className="mr-2 h-4 w-4" />
          Baixar OpenAPI
        </Button>
      </div>

      {/* API Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-600" />
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
              <Book className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Versão da API</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">v2.1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Chamadas/mês</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12.5k</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Documentation */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Endpoints Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-300 dark:bg-gray-700 p-1">
              <TabsTrigger value="users" className="py-3">Usuários</TabsTrigger>
              <TabsTrigger value="files" className="py-3">Arquivos</TabsTrigger>
              <TabsTrigger value="auth" className="py-3">Autenticação</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="mt-6">
              <div className="space-y-4">
                {endpoints.filter(e => e.id.includes('user')).map((endpoint) => (
                  <div key={endpoint.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          className={endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono text-gray-900 dark:text-gray-100">{endpoint.path}</code>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(endpoint.path, endpoint.id)}
                      >
                        {copiedEndpoints[endpoint.id] ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{endpoint.description}</p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resposta:</p>
                      <pre className="text-xs text-gray-900 dark:text-gray-100 overflow-x-auto">
                        {endpoint.response}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="mt-6">
              <div className="space-y-4">
                {endpoints.filter(e => e.id.includes('files')).map((endpoint) => (
                  <div key={endpoint.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-100 text-green-800">{endpoint.method}</Badge>
                        <code className="text-sm font-mono text-gray-900 dark:text-gray-100">{endpoint.path}</code>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(endpoint.path, endpoint.id)}
                      >
                        {copiedEndpoints[endpoint.id] ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{endpoint.description}</p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resposta:</p>
                      <pre className="text-xs text-gray-900 dark:text-gray-100 overflow-x-auto">
                        {endpoint.response}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="auth" className="mt-6">
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">Documentação de autenticação em desenvolvimento</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
