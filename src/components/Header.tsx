import React from 'react';
import { Smartphone, Home, User, Package, PlusCircle } from 'lucide-react';

interface HeaderProps {
  currentView: 'wizard' | 'cases' | 'warehouse';
  onNavigate: (view: 'wizard' | 'cases' | 'warehouse') => void;
  caseCount: number;
  lowStockCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  caseCount,
  lowStockCount,
}) => {
  return (
    <header className="bg-[#0B3B70] text-white shadow-md print:hidden sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Logo and Titles */}
        <div 
          onClick={() => onNavigate('wizard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors border border-white/20 flex items-center justify-center text-white">
            <Smartphone className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              ระบบตรวจสอบสภาพโทรศัพท์มือถือ
            </h1>
            <p className="text-xs text-blue-200/90 font-light">
              และจัดการคลังสินค้าในงานซ่อม
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onNavigate('wizard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              currentView === 'wizard'
                ? 'bg-white/20 text-white'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">ตรวจสภาพใหม่</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('cases')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors relative ${
              currentView === 'cases'
                ? 'bg-white/20 text-white'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>หน้าหลัก</span>
            {caseCount > 0 && (
              <span className="ml-0.5 bg-sky-400 text-[#0B3B70] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {caseCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('warehouse')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              currentView === 'warehouse'
                ? 'bg-white/20 text-white'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="hidden md:inline">คลังอะไหล่</span>
            {lowStockCount > 0 && (
              <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {lowStockCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 transition-colors border border-white/20 flex items-center justify-center cursor-pointer text-white ml-1">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};
