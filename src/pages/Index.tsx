
"use client";

import { ThemeProvider } from "../contexts/ThemeContext";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { 
  ImpressosSection, 
  CapacitaSection, 
  BibliotecaSection, 
  ImunePlaySection 
} from "../components/ModuleSection";
import { Footer } from "../components/Footer";

const Index = () => {
return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main>
          <HeroSection />
          <ImpressosSection />
          <CapacitaSection />
          <BibliotecaSection />
          <ImunePlaySection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
