import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck, Phone, MapPin, Calendar, Smartphone, Wrench } from 'lucide-react';
import { DamageItem, formatCurrency, STANDARD_LABOR_FEE, calculateTotalQuotation } from '../utils/pricing';

interface PrintQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseNumber?: string;
  model: string;
  modelCode: string;
  damageDescription: string;
  damageItems: DamageItem[];
  customerName?: string;
  customerPhone?: string;
  deviceImage?: string;
}

export const PrintQuotationModal: React.FC<PrintQuotationModalProps> = ({
  isOpen,
  onClose,
  caseNumber = 'REP-2026-1042',
  model,
  modelCode,
  damageDescription,
  damageItems,
  customerName = 'สมชาย ใจดี',
  customerPhone = '081-234-5678',
  deviceImage,
}) => {
  if (!isOpen) return null;

  const totalAmount = calculateTotalQuotation(damageItems, STANDARD_LABOR_FEE);
  const dateStr = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none">
        {/* Modal Top Bar (hidden on print) */}
        <div className="bg-[#0B3B70] text-white p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5" />
            <h3 className="font-bold text-sm sm:text-base">พิมพ์ใบประเมินราคาซ่อม</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์เอกสาร</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="ปิดหน้าต่างพิมพ์"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-gray-800 text-sm print:p-0 print:overflow-visible">
          {/* Company & Document Header */}
          <div className="border-b-2 border-[#0B3B70] pb-4 mb-5 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0B3B70] text-white flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-black text-[#0B3B70] tracking-tight">
                    ศูนย์บริการตรวจเช็คและซ่อมโทรศัพท์มือถือ
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    MOBILE REPAIR & WAREHOUSE SERVICE CENTER
                  </p>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 space-y-0.5">
                <p className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#0B3B70]" /> สาขาใหญ่ สยามสแควร์ ชั้น 4 กรุงเทพฯ
                </p>
                <p className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#0B3B70]" /> สายด่วนบริการลูกค้า 02-999-8888
                </p>
              </div>
            </div>

            {/* Document Box */}
            <div className="text-right">
              <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 text-right">
                <span className="block text-[10px] font-bold text-blue-800 uppercase">
                  ใบเสนอราคา / ใบประเมินการซ่อม
                </span>
                <span className="text-sm font-mono font-bold text-[#0B3B70]">
                  #{caseNumber}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1 flex items-center justify-end gap-1">
                <Calendar className="w-3 h-3" /> {dateStr}
              </p>
            </div>
          </div>

          {/* Customer & Device Meta Info */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 mb-5 text-xs">
            <div>
              <span className="font-bold text-gray-700 block mb-1">ข้อมูลลูกค้า :</span>
              <p className="text-gray-900 font-semibold">{customerName}</p>
              <p className="text-gray-600">เบอร์โทร: {customerPhone}</p>
            </div>
            <div>
              <span className="font-bold text-gray-700 block mb-1">ข้อมูลอุปกรณ์ :</span>
              <p className="text-gray-900 font-semibold">{model}</p>
              <p className="text-gray-600">โมเดลเครื่อง: {modelCode}</p>
            </div>
          </div>

          {/* Damage Points Summary */}
          <div className="mb-5 p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
            <span className="font-bold text-[#0B3B70] block mb-1">
              อาการเสียที่ตรวจพบ / ประเมินซ่อม :
            </span>
            <p className="text-gray-800 leading-relaxed">
              {damageDescription || 'หน้าจอแตก มีรอยร้าว, กล้องหลังไม่สามารถใช้งานได้'}
            </p>
          </div>

          {/* Items & Quotation Table */}
          <table className="w-full text-left border-collapse text-xs mb-5">
            <thead>
              <tr className="bg-gray-100 text-gray-700 font-bold border-y border-gray-300">
                <th className="py-2.5 px-3">ลำดับ</th>
                <th className="py-2.5 px-3">รายการซ่อม / อะไหล่</th>
                <th className="py-2.5 px-3">รายละเอียดงาน</th>
                <th className="py-2.5 px-3 text-right">ราคา (บาท)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {damageItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-3 text-gray-500">{idx + 1}</td>
                  <td className="py-2 px-3 font-semibold text-gray-900">{item.name}</td>
                  <td className="py-2 px-3 text-gray-600">{item.description}</td>
                  <td className="py-2 px-3 text-right font-medium">{formatCurrency(item.price)}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2 px-3 text-gray-500">{damageItems.length + 1}</td>
                <td className="py-2 px-3 font-semibold text-gray-900">ค่าบริการช่าง</td>
                <td className="py-2 px-3 text-gray-600">ค่าแรงตรวจเช็คและประกอบเครื่องมาตรฐาน</td>
                <td className="py-2 px-3 text-right font-medium">{formatCurrency(STANDARD_LABOR_FEE)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#0B3B70] bg-blue-50/40 text-sm">
                <td colSpan={3} className="py-3 px-3 font-bold text-[#0B3B70]">
                  ยอดประเมินรวมทั้งสิ้น (รวมภาษีมูลค่าเพิ่ม)
                </td>
                <td className="py-3 px-3 text-right font-extrabold text-[#0B3B70]">
                  {formatCurrency(totalAmount)}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Warranty & Terms */}
          <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 text-[11px] text-gray-600 mb-6 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-gray-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>เงื่อนไขการรับประกันงานซ่อม :</span>
            </div>
            <p>1. อะไหล่แท้รับประกันคุณภาพ 90 วัน นับตั้งแต่วันส่งมอบเครื่อง</p>
            <p>2. การรับประกันไม่ครอบคลุมกรณีเครื่องตกหล่น มีรอยแตกเพิ่ม ตกน้ำ หรือมีการดัดแปลงจากภายนอก</p>
            <p>3. กรุณานำใบประเมินนี้มาแสดงเมื่อมารับเครื่องซ่อม</p>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-700">
            <div>
              <div className="h-12 border-b border-gray-300 w-44 mx-auto mb-1"></div>
              <p className="font-semibold">ลงชื่อ ......................................................</p>
              <p className="text-[11px] text-gray-500 mt-0.5">({customerName})</p>
              <p className="text-[10px] text-gray-400">ลูกค้าผู้ยินยอมรับราคาประเมิน</p>
            </div>
            <div>
              <div className="h-12 border-b border-gray-300 w-44 mx-auto mb-1 flex items-end justify-center">
                <span className="text-blue-800 font-serif italic text-sm">วิชัย ช่างซ่อม</span>
              </div>
              <p className="font-semibold">ลงชื่อ ......................................................</p>
              <p className="text-[11px] text-gray-500 mt-0.5">(วิชัย ช่างชำนาญการ)</p>
              <p className="text-[10px] text-gray-400">ช่างเทคนิคผู้ประเมินราคา</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center print:hidden">
          <span className="text-xs text-gray-500">
            กดพิมพ์เพื่อสั่งพิมพ์เอกสารหรือบันทึกเป็น PDF
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 hover:bg-white text-gray-700 text-xs font-semibold rounded-xl cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2 bg-[#0B57D0] hover:bg-[#0946a8] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ใบประเมินราคา</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
