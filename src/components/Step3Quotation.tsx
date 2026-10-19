import React, { useState } from 'react';
import {
  ChevronLeft,
  Printer,
  FileText,
  Smartphone,
  Camera,
  Wrench,
  Battery,
  Shield,
  Zap,
  Volume2,
  Truck,
  Droplet,
  Send,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import {
  DamageItem,
  InventoryItem,
  formatCurrency,
  calculateTotalQuotation,
  STANDARD_LABOR_FEE,
} from '../utils/pricing';

interface Step3Props {
  selectedModel: string;
  modelCode: string;
  deviceImage: string;
  damageDescription: string;
  additionalImages: string[];
  damageItems: DamageItem[];
  inventory: InventoryItem[];
  onBack: () => void;
  onOpenWarehouse: () => void;
  onOpenPrint: () => void;
  onSubmitCase: (customerName: string, customerPhone: string) => void;
}

export const Step3Quotation: React.FC<Step3Props> = ({
  selectedModel,
  modelCode,
  deviceImage,
  damageDescription,
  additionalImages,
  damageItems,
  inventory,
  onBack,
  onOpenWarehouse,
  onOpenPrint,
  onSubmitCase,
}) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [customerName, setCustomerName] = useState('สมชาย ใจดี');
  const [customerPhone, setCustomerPhone] = useState('081-234-5678');

  const totalAmount = calculateTotalQuotation(damageItems, STANDARD_LABOR_FEE);

  // Relevant inventory items for this model and damages
  const relevantStock = inventory.filter((item) => {
    return (
      item.modelName.toLowerCase().includes(selectedModel.toLowerCase()) ||
      selectedModel.toLowerCase().includes(item.modelName.toLowerCase())
    );
  });

  // Split description by comma or bullet
  const damagePoints = damageDescription
    .split(/[,|\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const getDamageIcon = (category: string) => {
    switch (category) {
      case 'หน้าจอ':
        return <Smartphone className="w-4 h-4 text-blue-600" />;
      case 'กล้องหลัง':
        return <Camera className="w-4 h-4 text-blue-600" />;
      case 'แบตเตอรี่':
        return <Battery className="w-4 h-4 text-emerald-600" />;
      case 'ฝาหลัง':
        return <Shield className="w-4 h-4 text-amber-600" />;
      case 'ระบบชาร์จ':
        return <Zap className="w-4 h-4 text-orange-600" />;
      case 'ลำโพง':
        return <Volume2 className="w-4 h-4 text-purple-600" />;
      default:
        return <Wrench className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitCase(customerName, customerPhone);
    setShowSubmitModal(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Step Header */}
      <div className="flex items-start gap-3 sm:gap-4 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#0B3B70] text-white flex items-center justify-center shrink-0 shadow-sm">
          <Droplet className="w-5 h-5 fill-white text-white" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            ขั้นตอนที่ 3 : ประเมินราคาซ่อม
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            สรุปรายการประเมินราคาซ่อม ตรวจสอบสถานะสต็อกอะไหล่ และส่งเคสเข้าระบบ
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Phone & Damage Summary Card */}
        <div className="border border-blue-100 rounded-2xl p-5 bg-white shadow-2xs">
          <div className="flex items-center gap-2 mb-4 text-[#0B3B70] font-bold text-sm sm:text-base">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[#0B3B70]">
              <FileText className="w-4 h-4" />
            </div>
            <span>ความเสียหายที่ต้องซ่อม มีดังนี้</span>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between gap-5">
            {/* Left: Device Image & Info */}
            <div className="flex items-start gap-4">
              <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                <img
                  src={deviceImage}
                  alt={selectedModel}
                  className="max-h-full max-w-full object-contain drop-shadow-sm"
                />
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="text-gray-800">
                  <span className="text-gray-500">รุ่นเครื่อง : </span>
                  <span className="font-bold text-gray-900">{selectedModel}</span>
                </div>
                <div className="text-gray-800">
                  <span className="text-gray-500">โมเดลเครื่อง : </span>
                  <span className="font-semibold text-gray-700">{modelCode}</span>
                </div>
                <div className="pt-1">
                  <span className="text-gray-500 block text-xs font-semibold mb-1">
                    รายละเอียดความเสียหาย :
                  </span>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-800">
                    {damagePoints.length > 0 ? (
                      damagePoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400">ระบุอาการเสียทั่วไป</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Damage Photo Thumbnails */}
            {additionalImages.length > 0 && (
              <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
                {additionalImages.slice(0, 3).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 shadow-2xs"
                  >
                    <img
                      src={imgUrl}
                      alt={`จุดเสียหายที่ ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Items and Expense Table */}
        <div className="border border-blue-100 rounded-2xl overflow-hidden shadow-2xs">
          <div className="bg-[#f8fafd] px-5 py-3 border-b border-blue-100">
            <h3 className="text-sm font-bold text-gray-800">
              รายการซ่อมและค่าใช้จ่าย
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70 text-xs font-semibold text-gray-600">
                  <th className="py-3 px-5 w-1/4">รายการ</th>
                  <th className="py-3 px-5 w-1/2">รายละเอียด</th>
                  <th className="py-3 px-5 text-right w-1/4">ราคา</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {damageItems.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-gray-900 flex items-center gap-2.5">
                      <span className="p-1 rounded-md bg-gray-100">
                        {getDamageIcon(item.category)}
                      </span>
                      <span>{item.category}</span>
                    </td>
                    <td className="py-3.5 px-5 text-gray-600">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-5 text-right font-medium text-gray-900">
                      {formatCurrency(item.price)}
                    </td>
                  </tr>
                ))}

                {/* Labor Fee */}
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-3.5 px-5 font-medium text-gray-900 flex items-center gap-2.5">
                    <span className="p-1 rounded-md bg-gray-100">
                      <Wrench className="w-4 h-4 text-gray-600" />
                    </span>
                    <span>ค่าแรง</span>
                  </td>
                  <td className="py-3.5 px-5 text-gray-600">
                    ค่าบริการซ่อมและประกอบเครื่อง
                  </td>
                  <td className="py-3.5 px-5 text-right font-medium text-gray-900">
                    {formatCurrency(STANDARD_LABOR_FEE)}
                  </td>
                </tr>

                {/* Total Row */}
                <tr className="bg-blue-50/40 border-t-2 border-blue-200">
                  <td colSpan={2} className="py-4 px-5 font-bold text-[#0B3B70] text-base">
                    ราคารวมทั้งหมด
                  </td>
                  <td className="py-4 px-5 text-right font-extrabold text-[#0B3B70] text-lg sm:text-xl">
                    {formatCurrency(totalAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Warehouse Stock Status */}
        <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#0B3B70] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">
                สินค้าอะไหล่ในคลัง
              </h4>
              <div className="space-y-0.5 text-xs text-gray-600">
                {relevantStock.length > 0 ? (
                  relevantStock.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{item.partName} : </span>
                      <span className="font-semibold text-gray-900">
                        {item.stock} {item.unit}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">มีอะไหล่พร้อมเบิกจากคลังกลาง</p>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenWarehouse}
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-blue-300 text-[#0B3B70] text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-2xs self-end sm:self-center cursor-pointer shrink-0"
          >
            ดูคลังสินค้า
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto py-3 px-6 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ย้อนกลับ</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenPrint}
              className="w-full sm:w-auto py-3 px-5 rounded-xl border border-[#0B3B70] text-[#0B3B70] hover:bg-blue-50 font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ใบประเมินราคา</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#0B57D0] hover:bg-[#0946a8] text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>ส่งเคสงานซ่อม</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Info & Case Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B3B70] flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  ยืนยันการส่งเคสงานซ่อม
                </h3>
                <p className="text-xs text-gray-500">
                  กรอกข้อมูลลูกค้าเพื่อบันทึกและสร้างใบรับเครื่อง
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ชื่อ-นามสกุล ลูกค้า <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="เช่น สมชาย ใจดี"
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#0B3B70] focus:ring-1 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  เบอร์โทรศัพท์ติดต่อ <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="เช่น 081-234-5678"
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#0B3B70] focus:ring-1 focus:ring-blue-200"
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>รุ่นโทรศัพท์:</span>
                  <span className="font-bold text-gray-800">{selectedModel} ({modelCode})</span>
                </div>
                <div className="flex justify-between">
                  <span>ยอดประเมินรวม:</span>
                  <span className="font-bold text-blue-700">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0B57D0] hover:bg-[#0946a8] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>ยืนยันบันทึกและส่งเคส</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
