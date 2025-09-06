const features = [
  {
    icon: '📊',
    title: 'Детальная статистика',
    description: 'Win Rate, Profit Factor, средние прибыль/убыток и другие ключевые метрики'
  },
  {
    icon: '📈',
    title: 'Визуализация сделок',
    description: 'Графики депозита и наглядное отображение торговых результатов'
  },
  {
    icon: '🖼️',
    title: 'Скриншоты графиков',
    description: 'Прикрепляйте снимки графиков к сделкам для визуального анализа'
  },
  {
    icon: '⚡',
    title: 'Быстрый ввод',
    description: 'Удобный интерфейс для быстрого добавления и редактирования сделок'
  },
  {
    icon: '🔒',
    title: 'Конфиденциальность',
    description: 'Ваши данные хранятся локально и не передаются третьим лицам'
  },
  {
    icon: '🎯',
    title: 'Анализ ошибок',
    description: 'Выявляйте patterns и улучшайте свою торговую стратегию'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают наш дневник</h2>
        <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
          Все необходимое для серьезного анализа вашей торговой деятельности
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="trading-card p-6 text-center">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-[#94a3b8]">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};