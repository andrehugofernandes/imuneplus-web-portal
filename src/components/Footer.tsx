
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/lovable-uploads/77edc2c1-71fe-437e-8f38-fbb94a815b93.png" 
              alt="IMUNE+ Jaboatão" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400">
              Sistema integrado de recursos para profissionais de imunização de Jaboatão dos Guararapes.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#impressos" className="text-gray-400 hover:text-white transition-colors">Impressos IMUNE+</a></li>
              <li><a href="#capacita" className="text-gray-400 hover:text-white transition-colors">Capacita+</a></li>
              <li><a href="#biblioteca" className="text-gray-400 hover:text-white transition-colors">Biblioteca IMUNE+</a></li>
              <li><a href="#imuneplay" className="text-gray-400 hover:text-white transition-colors">ImunePlay</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-400 mb-2">Secretaria de Saúde</p>
            <p className="text-gray-400 mb-2">Jaboatão dos Guararapes - PE</p>
            <p className="text-gray-400">imunizacao@jaboatao.pe.gov.br</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 IMUNE+ Jaboatão. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
