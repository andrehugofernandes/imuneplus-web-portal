
"use client";

import { FileText, BookOpen, Video, GraduationCap, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ModuleSectionProps {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  reversed?: boolean;
  buttons?: string[];
  hasCategories?: boolean;
  hasVideoCarousel?: boolean;
  subcategories?: Array<{
    name: string;
    files: string[];
  }>;
  textAlign?: 'left' | 'right';
}

export function ModuleSection({ 
  id, 
  title, 
  description, 
  color, 
  icon, 
  reversed = false, 
  buttons = [],
  hasCategories = false,
  hasVideoCarousel = false,
  subcategories = [],
  textAlign = 'left'
}: ModuleSectionProps) {
  const [openAccordions, setOpenAccordions] = useState<{[key: string]: boolean}>({});

  const bgColor = color === "orange" ? "bg-orange-50 dark:bg-orange-900/20" :
                  color === "blue" ? "bg-blue-50 dark:bg-blue-900/20" :
                  color === "green" ? "bg-green-50 dark:bg-green-900/20" :
                  color === "emerald" ? "bg-emerald-50 dark:bg-emerald-900/20" :
                  color === "teal" ? "bg-teal-50 dark:bg-teal-900/20" :
                  "bg-gray-50 dark:bg-gray-900/20";

  const accentColor = color === "orange" ? "text-orange-600" :
                      color === "blue" ? "text-blue-600" :
                      color === "green" ? "text-green-600" :
                      color === "emerald" ? "text-emerald-600" :
                      color === "teal" ? "text-teal-600" :
                      "text-gray-600";

  const buttonColor = color === "orange" ? "bg-orange-500 hover:bg-orange-600" :
                      color === "blue" ? "bg-blue-600 hover:bg-blue-700" :
                      color === "green" ? "bg-green-600 hover:bg-green-700" :
                      color === "emerald" ? "bg-emerald-500 hover:bg-emerald-600" :
                      color === "teal" ? "bg-teal-500 hover:bg-teal-600" :
                      "bg-gray-500 hover:bg-gray-600";

  const toggleAccordion = (categoryName: string) => {
    console.log('Toggling accordion:', categoryName);
    setOpenAccordions(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleTooltipOpen = (fileName: string) => {
    console.log('Tooltip opening for file:', fileName);
  };

  const handleTooltipClose = () => {
    console.log('Tooltip closing');
  };

  const mockVideos = [
    "Técnicas de Aplicação - Parte 1",
    "Protocolos de Segurança",
    "Orientações Gerais",
    "Atualizações Técnicas 2024",
    "Boas Práticas em Imunização",
    "Prevenção de Eventos Adversos"
  ];

  return (
    <TooltipProvider delayDuration={100}>
      <section id={id} className={`py-20 ${bgColor}`}>
        <div className="container mx-auto px-4">
          <div className={`grid lg:grid-cols-5 gap-8 items-start ${reversed ? 'lg:flex-row-reverse' : ''}`}>
            {/* Content - 40% width */}
            <div className={`lg:col-span-2 space-y-6 ${reversed ? 'lg:order-2' : ''} ${textAlign === 'right' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center space-x-4 ${textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg ${accentColor} bg-white dark:bg-gray-800`}>
                  {icon}
                </div>
                <h2 className={`text-3xl lg:text-4xl font-bold ${accentColor}`}>
                  {title}
                </h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Content Area - 60% width */}
            <div className={`lg:col-span-3 ${reversed ? 'lg:order-1' : ''}`}>
              {hasVideoCarousel ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Vídeos Educativos
                  </h3>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {mockVideos.map((video, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                          <div className="p-2">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 aspect-video flex flex-col justify-center items-center relative group cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              <Video className={`h-8 w-8 mb-2 ${accentColor}`} />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 rounded-lg transition-colors flex items-center justify-center">
                                <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Video className={`h-6 w-6 ${accentColor}`} />
                                </div>
                              </div>
                            </div>
                            <p className="text-sm font-medium text-center mt-2 text-gray-700 dark:text-gray-300">
                              {video}
                            </p>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 z-[5]" />
                    <CarouselNext className="right-2 z-[5]" />
                  </Carousel>
                </div>
              ) : hasCategories ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg relative">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Categorias por Imunobiológico
                  </h3>
                  <div className="space-y-4">
                    {subcategories.map((category) => (
                      <Collapsible
                        key={category.name}
                        open={openAccordions[category.name]}
                        onOpenChange={() => toggleAccordion(category.name)}
                      >
                        <CollapsibleTrigger asChild>
                          <button
                            className={`w-full ${buttonColor} text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-sm flex items-center justify-between relative z-[10]`}
                          >
                            <span>{category.name}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                openAccordions[category.name] ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3">
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 min-h-[150px] relative overflow-visible">
                            <Carousel className="w-full">
                              <CarouselContent className="-ml-2">
                                {category.files.map((file, index) => (
                                  <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-2 relative">
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <button
                                            className={`w-full ${buttonColor} text-white px-3 py-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm flex items-center space-x-2 relative z-[50]`}
                                            onMouseEnter={() => handleTooltipOpen(file)}
                                            onMouseLeave={handleTooltipClose}
                                          >
                                            <FileText className="h-4 w-4 flex-shrink-0" />
                                            <span className="truncate text-left">{file}</span>
                                          </button>
                                        </TooltipTrigger>
                                        <TooltipContent 
                                          className="bg-black text-white px-3 py-2 rounded-md text-sm whitespace-nowrap tooltip-high-z"
                                          side="top"
                                          align="center"
                                          sideOffset={12}
                                        >
                                          <p className="font-medium">{file}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                              <CarouselPrevious className="-left-16 z-[1]" />
                              <CarouselNext className="-right-16 z-[1]" />
                            </Carousel>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {buttons.map((button, index) => (
                    <button
                      key={index}
                      className={`w-full ${buttonColor} text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg text-left`}
                    >
                      {button}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

// Pre-configured module sections
export function ImpressosSection() {
  const subcategories = [
    {
      name: "Cartão de Vacina",
      files: ["Cartão Criança - Novo Modelo", "Cartão Adult - Atualizado", "Cartão Idoso - Especial", "Cartão Gestante - 2024"]
    },
    {
      name: "Fichas de Registro",
      files: ["Ficha Individual - Modelo A", "Ficha Coletiva - Campanha", "Ficha Controle - Estoque", "Ficha Acompanhamento - Mensal"]
    },
    {
      name: "Formulários Oficiais",
      files: ["Formulário ESAVI", "Formulário Investigação", "Formulário Notificação", "Formulário Relatório"]
    },
    {
      name: "Documentos Técnicos",
      files: ["Manual Técnico 2024", "Protocolo Aplicação", "Guia Procedimentos", "Normas Segurança"]
    }
  ];

  return (
    <ModuleSection
      id="impressos"
      title="IMPRESSOS IMUNE+"
      description="Neste espaço, o profissional de saúde encontrará materiais prontos para impressão, que podem ser utilizados no dia a dia da unidade. Aqui estarão disponíveis modelos de cartão de vacina, fichas, formulários e outros documentos importantes para atender demandas imediatas, facilitando a rotina de trabalho e garantindo a continuidade dos serviços mesmo diante de imprevistos."
      color="orange"
      icon={<FileText size={24} />}
      hasCategories={true}
      subcategories={subcategories}
      textAlign="right"
    />
  );
}

export function CapacitaSection() {
  const subcategories = [
    {
      name: "Apresentações",
      files: ["Técnicas Aplicação 2024", "Imunização Infantil", "Vacinas COVID-19", "Capacitação Gestores"]
    },
    {
      name: "Apostilas",
      files: ["Manual Básico Imunização", "Apostila Técnicas Avançadas", "Guia Prático Sala Vacina", "Material Complementar"]
    },
    {
      name: "Material de Apoio",
      files: ["Infográficos Educativos", "Cartilhas Orientação", "Vídeos Explicativos", "Quiz Conhecimento"]
    },
    {
      name: "Guias de Estudo",
      files: ["Roteiro Estudo Básico", "Cronograma Capacitação", "Plano Individual", "Avaliação Competências"]
    }
  ];

  return (
    <ModuleSection
      id="capacita"
      title="CAPACITA+"
      description="Neste espaço o profissional acessa todo o material complementar dos treinamentos e capacitações promovidos pela coordenação de imunização. São apresentações, apostilas e arquivos utilizados durante os encontros formativos, disponíveis para consulta e reforço do conteúdo aprendido. Uma forma prática de revisar e manter-se sempre atualizado."
      color="blue"
      icon={<GraduationCap size={24} />}
      reversed={true}
      hasCategories={true}
      subcategories={subcategories}
    />
  );
}

export function BibliotecaSection() {
  const mockSubcategories = [
    {
      name: "COVID-19",
      files: ["Nota Técnica COVID-19", "Manual de Aplicação", "Protocolo de Segurança"]
    },
    {
      name: "DENGUE",
      files: ["Diretrizes Dengue 2024"]
    },
    {
      name: "ESAVI",
      files: ["Manual ESAVI", "Formulário de Notificação", "Protocolo de Investigação"]
    },
    {
      name: "HPV",
      files: ["Guia HPV Adolescentes"]
    },
    {
      name: "INFLUENZA",
      files: ["Campanha Influenza 2024"]
    },
    {
      name: "MANUAIS",
      files: ["Manual Geral", "Procedimentos Operacionais", "Boas Práticas"]
    },
    {
      name: "VIP",
      files: ["Protocolo VIP"]
    }
  ];

  return (
    <ModuleSection
      id="biblioteca"
      title="BIBLIOTECA IMUNE+"
      description="Um acervo digital com documentos técnicos organizados por imunobiológico. Neste espaço o profissional encontra notas técnicas, atualizações do Ministério da Saúde, manuais, informes e demais referências oficiais sobre vacinas e imunização. Tudo centralizado e fácil de acessar para apoiar as decisões e práticas na sala de vacina."
      color="green"
      icon={<BookOpen size={24} />}
      hasCategories={true}
      subcategories={mockSubcategories}
      textAlign="right"
    />
  );
}

export function ImunePlaySection() {
  return (
    <ModuleSection
      id="imuneplay"
      title="IMUNEPLAY"
      description="Aqui serão encontrados vídeos curtos, objetivos e educativos, com orientações técnicas baseadas nas diretrizes do Ministério da Saúde. O objetivo é facilitar o aprendizado contínuo com conteúdos rápidos e acessíveis, que ajudam no aperfeiçoamento das práticas profissionais de forma dinâmica e moderna."
      color="teal"
      icon={<Video size={24} />}
      reversed={true}
      hasVideoCarousel={true}
    />
  );
}
