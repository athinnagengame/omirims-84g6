import React, { useState } from 'react';
import { Package, X, Search, Plus, Minus, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { InventoryItem } from '../utils/pricing';

interface WarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
  onUpdateStock: (id: string, delta: number) => void;
  onResetStock: () => void;
}

export const WarehouseModal: React.FC<WarehouseModalProps> = ({
  isOpen,
  onClose,
  inventory,
  onUpdateStock,
  onResetStock,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredItems = inventory.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.partName.toLowerCase().includes(q) ||
      item.modelName.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-blue-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B3B70] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                คลังสินค้าอะไหล่ในงานซ่อม
              </h2>
              <p className="text-xs text-blue-200">
                ตรวจสอบและจัดการจำนวนสต็อกอะไหล่โทรศัพท์มือถือพร้อมใช้งาน
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="ปิดหน้าต่างคลังสินค้า"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่ออะไหล่ หรือรุ่นเครื่อง..."
              className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm outline-none focus:border-[#0B3B70]"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={onResetStock}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-300 hover:bg-white text-xs font-medium text-gray-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>รีเซ็ตสต็อกเริ่มต้น</span>
            </button>
          </div>
        </div>

        {/* Inventory List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-2 stroke-1" />
              <p className="text-sm">ไม่พบรายการอะไหล่ที่ค้นหา</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isLowStock = item.stock <= item.minStock;
              const isOutOfStock = item.stock === 0;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isOutOfStock
                      ? 'bg-red-50/40 border-red-200'
                      : isLowStock
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-white border-gray-200 hover:border-blue-200 shadow-2xs'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">
                        {item.partName}
                      </span>
                      {isOutOfStock ? (
                        <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> สินค้าหมด
                        </span>
                      ) : isLowStock ? (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> สต็อกเหลือน้อย
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> พร้อมใช้งาน
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-3">
                      <span>รุ่น: <strong className="text-gray-700">{item.modelName}</strong></span>
                      <span>ตำแหน่งเก็บ: <strong className="text-gray-700">{item.location}</strong></span>
                    </div>
                  </div>

                  {/* Stock Quantity Control */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs text-gray-500">คงเหลือ:</span>
                    <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                      <button
                        type="button"
                        onClick={() => onUpdateStock(item.id, -1)}
                        disabled={item.stock <= 0}
                        className="p-1.5 hover:bg-gray-100 text-gray-600 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
                        title="ลดจำนวน"
                        aria-label={`ลดสต็อก ${item.partName}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-gray-900 select-none">
                        {item.stock} {item.unit}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateStock(item.id, 1)}
                        className="p-1.5 hover:bg-gray-100 text-gray-600 cursor-pointer"
                        title="เพิ่มจำนวน"
                        aria-label={`เพิ่มสต็อก ${item.partName}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0B3B70] hover:bg-[#082d57] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            เรียบร้อย
          </button>
        </div>
      </div>
    </div>
  );
};
