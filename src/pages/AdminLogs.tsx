
export default function AdminLogs() {
  const logs = [
    { id: 1, timestamp: '2024-01-20 14:30:25', user: 'admin', action: 'Login realizado', ip: '192.168.1.100', status: 'success' },
    { id: 2, timestamp: '2024-01-20 14:25:15', user: 'joao.silva', action: 'Upload de arquivo', ip: '192.168.1.101', status: 'success' },
    { id: 3, timestamp: '2024-01-20 14:20:10', user: 'maria.santos', action: 'Tentativa de login inválido', ip: '192.168.1.102', status: 'error' },
    { id: 4, timestamp: '2024-01-20 14:15:05', user: 'admin', action: 'Criação de usuário', ip: '192.168.1.100', status: 'success' },
    { id: 5, timestamp: '2024-01-20 14:10:00', user: 'pedro.costa', action: 'Download de arquivo', ip: '192.168.1.103', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Logs do Sistema
        </h1>
        <p className="text-gray-600 mt-2">
          Monitore todas as atividades e eventos do sistema
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Atividades Recentes</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>Todos os tipos</option>
                <option>Login</option>
                <option>Upload</option>
                <option>Download</option>
                <option>Erro</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">
                Exportar
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      log.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status === 'success' ? 'Sucesso' : 'Erro'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
