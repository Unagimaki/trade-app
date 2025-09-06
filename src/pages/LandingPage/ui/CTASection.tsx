import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Готовы улучшить свою торговлю?
        </h2>
        <p className="text-lg text-[#94a3b8] mb-8">
          Присоединяйтесь к трейдерам, которые уже используют наш дневник для анализа своих сделок
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#2563eb] text-white px-8 py-6 text-lg"
          >
            <Link to="/app">
              Начать бесплатно
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-[#334155] text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f8fafc] px-8 py-6 text-lg"
          >
            <Link to="/app/chart">
              Посмотреть примеры
            </Link>
          </Button>
        </div>
        
        <p className="text-sm text-[#64748b] mt-6">
          Не требует регистрации. Данные хранятся локально на вашем устройстве.
        </p>
      </div>
    </section>
  );
};