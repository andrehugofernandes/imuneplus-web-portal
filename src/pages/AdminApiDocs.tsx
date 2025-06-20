
export default function AdminApiDocs() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/users',
      description: 'Lista todos os usuários',
      auth: 'Bearer Token'
    },
    {
      method: 'POST',
      path: '/api/users',
      description: 'Cria um novo usuário',
      auth: 'Bearer Token'
    },
    {
      method: 'GET',
      path: '/api/files',
      description: 'Lista todos os arquivos',
      auth: 'Bearer Token'
    },
    {
      method: 'POST',
      path: '/api/files/upload',
      description: 'Faz upload de um arquivo',
      auth: 'Bearer Token'
    },
    {
      method: 'GET',
      path: '/api/categories',
      description: 'Lista todas as categorias',
      auth: 'Bearer Token'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Documentação da API
        </h1>
        <p className="text-gray-600 mt-2">
          Referência completa da API do sistema IMUNE+
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Autenticação</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              Todas as requisições devem incluir o token de autenticação no header:
            </p>
            <code className="bg-gray-800 text-green-400 px-3 py-1 rounded text-sm">
              Authorization: Bearer YOUR_TOKEN_HERE
            </code>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Base URL</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <code className="text-blue-800 font-mono">
              https://api.imune.gov.br/v1
            </code>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Endpoints Disponíveis</h2>
          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    endpoint.method === 'GET' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="font-mono text-sm">{endpoint.path}</code>
                </div>
                <p className="text-gray-700 text-sm mb-2">{endpoint.description}</p>
                <p className="text-xs text-gray-500">
                  <strong>Autenticação:</strong> {endpoint.auth}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">📘 Documentação Completa</h3>
          <p className="text-sm text-yellow-700">
            Para uma documentação mais detalhada com exemplos de requisições e respostas, 
            acesse nossa documentação completa no Swagger UI.
          </p>
          <button className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700">
            Abrir Swagger UI
          </button>
        </div>
      </div>
    </div>
  );
}
