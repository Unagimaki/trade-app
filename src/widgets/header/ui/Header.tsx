import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuList 
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const location = useLocation();
  
  // Определяем активный путь для подсветки текущей страницы
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-[#334155] bg-[#0f172a] backdrop-blur-sm supports-[backdrop-filter]:bg-[#0f172a]/80 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Логотип и название */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#0ea5e9]">
                <span className="text-lg font-bold text-white">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#2563eb] bg-clip-text text-transparent">
                Trader's Diary
              </span>
            </div>
          </Link>

          {/* Навигация */}
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-1">
              <NavigationMenuItem>
                <Button
                  asChild
                  variant={isActive('/trades') ? "secondary" : "ghost"} // ИЗМЕНИЛОСЬ: проверяем /trades
                  className={cn(
                    "transition-all duration-200 hover:bg-[#1e293b]",
                    isActive('/trades') && "bg-[#1e293b] text-[#f8fafc]" // ИЗМЕНИЛОСЬ: проверяем /trades
                  )}
                >
                  <Link to="trades">
                    <span className="mr-2">📊</span>
                    Дневник
                  </Link>
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button
                  asChild
                  variant={isActive('/curve') ? "secondary" : "ghost"}
                  className={cn(
                    "transition-all duration-200 hover:bg-[#1e293b]",
                    isActive('/curve') && "bg-[#1e293b] text-[#f8fafc]"
                  )}
                >
                  <Link to="/curve">
                    <span className="mr-2">📈</span>
                    График
                  </Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Правая часть (место для будущих элементов) */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#334155] text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f8fafc] transition-colors"
            >
              <span className="mr-2">⚙️</span>
              Настройки
            </Button>
            
            <Button 
              size="sm"
              className="bg-gradient-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#2563eb] text-white transition-all duration-200"
            >
              <span className="mr-2">👤</span>
              Войти
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};