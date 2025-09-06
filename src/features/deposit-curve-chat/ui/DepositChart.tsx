import type { DepositChartData } from '@/features/deposit-curve-chat/model/types';
import { formatCurrency, formatCurrencyRounded } from '@/lib/formatters';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DepositChartProps {
  data: DepositChartData;
}

export const DepositChart: React.FC<DepositChartProps> = ({ data }) => {  
  const formatCurrencyAxis = formatCurrencyRounded
  const formatCurrencyTooltip = formatCurrency

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-[#1e293b] border border-[#475569] p-3 rounded-md">
          <p className="text-[#f8fafc] font-medium">{new Date(point.date).toLocaleDateString()}</p>
          <p className="text-[#3b82f6]">Баланс: {formatCurrencyTooltip(point.balance)}</p>
          {point.profit !== undefined && (
            <p className={point.profit >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'}>
              Прибыль: {point.profit >= 0 ? '+' : ''}{formatCurrencyTooltip(point.profit)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.points}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#f8fafc' }}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis 
            tick={{ fill: '#f8fafc' }}
            tickFormatter={formatCurrencyAxis} // Используем для оси
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};