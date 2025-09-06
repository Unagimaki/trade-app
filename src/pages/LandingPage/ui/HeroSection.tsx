import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#2563eb] bg-clip-text text-transparent">
          Trader's Diary
        </h1>
        <p className="text-xl md:text-2xl text-[#94a3b8] mb-8">
          Профессиональный дневник трейдера для анализа сделок и улучшения торговой стратегии
        </p>
        <p className="text-lg text-[#cbd5e1] mb-12 max-w-2xl mx-auto">
          Записывайте сделки, анализируйте статистику и принимайте взвешенные решения 
          на основе данных, а не эмоций
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#2563eb] text-white px-8 py-6 text-lg"
          >
            <Link to="/app">
              Начать торговать
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-[#334155] text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f8fafc] px-8 py-6 text-lg"
          >
            <Link to="/app/chart">
              Посмотреть демо
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};