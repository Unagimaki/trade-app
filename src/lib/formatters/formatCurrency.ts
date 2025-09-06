export const formatCurrency = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

// Опционально: можно создать варианты с разным округлением
export const formatCurrencyPrecise = (value: number): string => 
  formatCurrency(value, 2); // Точный (с копейками)

export const formatCurrencyRounded = (value: number): string => 
  formatCurrency(value, 0); // Округленный (без копеек)