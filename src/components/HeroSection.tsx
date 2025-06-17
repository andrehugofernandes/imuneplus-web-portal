
"use client";

import { Play } from "lucide-react";

const modules = [
  {
    name: "IMPRESSOS IMUNE+",
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    hoverColor: "hover:from-orange-600 hover:to-orange-700",
    href: "#impressos"
  },
  {
    name: "CAPACITA+",
    color: "bg-gradient-to-r from-blue-600 to-blue-700",
    hoverColor: "hover:from-blue-700 hover:to-blue-800",
    href: "#capacita"
  },
  {
    name: "BIBLIOTECA IMUNE+",
    color: "bg-gradient-to-r from-green-600 to-green-700",
    hoverColor: "hover:from-green-700 hover:to-green-800",
    href: "#biblioteca"
  },
  {
    name: "IMUNEPLAY",
    color: "bg-gradient-to-r from-green-400 to-green-500",
    hoverColor: "hover:from-green-500 hover:to-green-600",
    href: "#imuneplay"
  }
];

export function HeroSection() {
  return (
    <section id="home" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                IMUNE+ JABOATÃO
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Sistema integrado de recursos para profissionais de imunização de Jaboatão dos Guararapes
              </p>
            </div>

            {/* Module Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modules.map((module) => (
                <a
                  key={module.name}
                  href={module.href}
                  className={`${module.color} ${module.hoverColor} text-white px-6 py-4 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  {module.name}
                </a>
              ))}
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="lg:pl-8">
            <div className="relative bg-gray-200 dark:bg-gray-700 rounded-2xl aspect-video shadow-2xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/90 dark:bg-gray-800/90 rounded-full p-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play size={32} className="text-orange-500 ml-1" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                  Vídeo de apresentação do IMUNE+
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
