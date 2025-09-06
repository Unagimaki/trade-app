const steps = [
  {
    step: '1',
    title: 'Добавляйте сделки',
    description: 'Вносите информацию о каждой сделке: актив, направление, результат'
  },
  {
    step: '2',
    title: 'Анализируйте статистику',
    description: 'Изучайте ключевые метрики эффективности вашей торговли'
  },
  {
    step: '3',
    title: 'Смотрите графики',
    description: 'Визуализируйте динамику депозита и находите закономерности'
  },
  {
    step: '4',
    title: 'Улучшайте стратегию',
    description: 'Принимайте решения на основе данных, а не эмоций'
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="container mx-auto px-4 py-20 bg-[#1e293b] rounded-2xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Как это работает</h2>
        <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
          Всего 4 простых шага к профессиональному анализу вашей торговли
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((item) => (
          <div key={item.step} className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#22d3ee] to-[#0ea5e9] rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
              {item.step}
            </div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-[#94a3b8]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};