
export default function AdminFiles() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Gestão de Arquivos
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie os arquivos e documentos do sistema
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-500 text-2xl">📁</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum arquivo encontrado
          </h3>
          <p className="text-gray-500 mb-4">
            Comece fazendo upload dos seus primeiros arquivos
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Fazer Upload
          </button>
        </div>
      </div>
    </div>
  );
}
