import React from "react";

interface TradeItemDirectionSelectProps {
  onDirectionSelect: (direction: "long" | "short" | null) => void;
  onClose: () => void;
  className?: string;
}

export const TradeItemDirectionSelect: React.FC<TradeItemDirectionSelectProps> = ({
  onDirectionSelect,
  onClose,
  className = ""
}) => {
  const handleLongSelect = () => {
    onDirectionSelect("long");
    onClose()
  };

  const handleShortSelect = () => {
    onDirectionSelect("short");
    onClose()
  };
  const handleDeleteSelect = () => {
    onDirectionSelect(null);
    onClose()
  }

  return (
    <div className={`absolute top-full left-0 mt-1 bg-[#1e293b] border border-[#475569] rounded-md shadow-lg z-50 w-32 ${className}`}>
      <div 
        className="px-3 py-2 hover:bg-[#3b82f6] hover:text-[#f8fafc] cursor-pointer transition-colors duration-200"
        onClick={handleLongSelect}
      >
        Long
      </div>
      <div 
        className="px-3 py-2 hover:bg-[#3b82f6] hover:text-[#f8fafc] cursor-pointer transition-colors duration-200"
        onClick={handleShortSelect}
      >
        Short
      </div>
      <div 
        className="px-3 py-2 hover:bg-[#3b82f6] hover:text-[#f8fafc] cursor-pointer text-[#94a3b8] transition-colors duration-200"
        onClick={onClose}
      >
        Закрыть
      </div>
      <div 
        className="px-3 py-2 hover:bg-[#3b82f6] hover:text-[#f8fafc] cursor-pointer text-[#94a3b8] transition-colors duration-200"
        onClick={handleDeleteSelect}
      >
        Удалить
      </div>
    </div>
  );
};