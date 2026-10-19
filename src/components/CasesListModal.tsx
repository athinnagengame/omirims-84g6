import React, { useState } from 'react';
import { FileText, Search, Clock, CheckCircle2, ChevronRight, Printer, AlertCircle, PlusCircle, Smartphone } from 'lucide-react';
import { RepairCase, formatCurrency } from '../utils/pricing';

interface CasesListModalProps {
  cases: RepairCase[];
  onSelectCase: (c: RepairCase) => void;
  onNewCase: () => void;
  onUpdateStatus: (caseId: string, status: RepairCase['status']) => void;
}

export const CasesListModal: React.FC<CasesListModalProps> = ({
  cases,
  onSelectCase,
  onNewCase,
  onUpdateStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = cases.filter((c) => {
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.customerPhone || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: RepairCase['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> รอซ่อม
          </span>
        );
      case 'in_progress':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> กำลังซ่อม
          </span>
        );
      case 'completed':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> ซ่อมเสร็จแล้ว
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> ส่งมอบแล้ว
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#0B3B70]" />
            รายการเคสงานซ่อมโทรศัพท์มือถือ
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            ติดตามสถานะเคสที่ส่งเข้าระบบ พิมพ์ใบเสนอราคา และอัปเดตงานซ่อม
          </p>
        </div>

        <button
          type="button"
          onClick={onNewCase}
          className="px-5 py-2.5 bg-[#0B57D0] hover:bg-[#0946a8] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>สร้างเคสใหม่</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาเลขที่เคส, ชื่อลูกค้า, หรือรุ่นเครื่อง..."
            className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#0B3B70] shadow-2xs"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'ทั้งหมด' },
            { id: 'pending', label: 'รอซ่อม' },
            { id: 'in_progress', label: 'กำลังซ่อม' },
            { id: 'completed', label: 'ซ่อมเสร็จแล้ว' },
            { id: 'delivered', label: 'ส่งมอบแล้ว' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setFilterStatus(pill.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                filterStatus === pill.id
                  ? 'bg-[#0B3B70] text-white shadow-2xs'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
          <Smartphone className="w-12 h-12 mx-auto mb-3 stroke-1 text-gray-300" />
          <p className="font-semibold text-gray-600">ยังไม่มีเคสงานซ่อมในหมวดนี้</p>
          <p className="text-xs text-gray-400 mt-1">
            คุณสามารถเริ่มตรวจสอบสภาพโทรศัพท์และส่งเคสใหม่ได้ทันที
          </p>
          <button
            type="button"
            onClick={onNewCase}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-50 text-[#0B3B70] text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
          >
            เริ่มตรวจสอบเครื่องใหม่
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 shadow-2xs hover:shadow-sm p-4 sm:p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-16 rounded-xl bg-gray-50 border border-gray-200 p-1 shrink-0 flex items-center justify-center">
                  <img
                    src={item.deviceImage}
                    alt={item.model}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-sm text-[#0B3B70]">
                      #{item.caseNumber}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    {item.model} <span className="text-xs font-normal text-gray-500">({item.modelCode})</span>
                  </h3>
                  <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <span>ลูกค้า: <strong className="text-gray-700">{item.customerName || 'ทั่วไป'}</strong></span>
                    <span>เบอร์: <strong className="text-gray-700">{item.customerPhone || '-'}</strong></span>
                    <span>วันที่: {item.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                <div className="text-left sm:text-right">
                  <span className="block text-[11px] text-gray-400">ราคาประเมินรวม</span>
                  <span className="font-extrabold text-[#0B3B70] text-base sm:text-lg">
                    {formatCurrency(item.totalPrice)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={item.status}
                    onChange={(e) => onUpdateStatus(item.id, e.target.value as RepairCase['status'])}
                    className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white text-gray-700 outline-none cursor-pointer"
                  >
                    <option value="pending">รอซ่อม</option>
                    <option value="in_progress">กำลังซ่อม</option>
                    <option value="completed">ซ่อมเสร็จ</option>
                    <option value="delivered">ส่งมอบแล้ว</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => onSelectCase(item)}
                    className="p-2 border border-gray-300 hover:bg-gray-50 rounded-xl text-gray-600 cursor-pointer"
                    title="พิมพ์ใบประเมินราคา"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
