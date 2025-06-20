
export default function AdminCategories() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Gestão de Categorias
        </h1>
        <p className="text-gray-600 mt-2">
          Organize e gerencie as categorias do sistema
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Categorias Disponíveis</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Nova Categoria
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Documentos', 'Imagens', 'Vídeos', 'Relatórios', 'Formulários'].map((category) => (
            <div key={category} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {Math.floor(Math.random() * 50)} itens
              </p>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Editar
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
