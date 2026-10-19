import React from 'react';
import { Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-8 border-t border-gray-200 bg-white text-gray-500 text-xs print:hidden">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0B3B70] text-white flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <span className="font-bold text-gray-800 block text-sm">
              Mobile Repair & Warehouse System
            </span>
            <span className="text-gray-400 text-[11px]">
              ตรวจสอบสภาพเครื่อง • ประเมินความเสียหาย • จัดการคลังสินค้า
            </span>
          </div>
        </div>

        {/* Right links */}
        <div className="flex items-center gap-2 text-gray-500 text-[11px]">
          <button type="button" className="hover:text-blue-700 transition-colors cursor-pointer">
            ติดต่อเรา
          </button>
          <span>|</span>
          <button type="button" className="hover:text-blue-700 transition-colors cursor-pointer">
            นโยบายความเป็นส่วนตัว
          </button>
        </div>
      </div>
    </footer>
  );
};
