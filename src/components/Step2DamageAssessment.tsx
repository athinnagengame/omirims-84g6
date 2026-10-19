import React, { useRef } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Info, AlertCircle, Droplet, Plus, Sparkles } from 'lucide-react';
import { SAMPLE_DAMAGE_IMAGES } from '../utils/pricing';

interface Step2Props {
  damageDescription: string;
  onChangeDamageDescription: (desc: string) => void;
  additionalImages: string[];
  onAddAdditionalImage: (url: string) => void;
  onRemoveAdditionalImage: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const QUICK_DAMAGE_TAGS = [
  'หน้าจอแตก มีรอยร้าว',
  'กล้องหลังไม่สามารถใช้งานได้',
  'ระบบสัมผัสไม่ทำงาน (ทัชสกรีนหลอน)',
  'แบตเตอรี่เสื่อม / สุขภาพแบตเตอรี่ต่ำกว่า 75%',
  'กระจกฝาหลังแตก มีรอยร้าว',
  'พอร์ตชาร์จหลวม / ชาร์จไฟไม่เข้า',
  'ลำโพงเสียงแตก / ไม่มีเสียง',
];

export const Step2DamageAssessment: React.FC<Step2Props> = ({
  damageDescription,
  onChangeDamageDescription,
  additionalImages,
  onAddAdditionalImage,
  onRemoveAdditionalImage,
  onBack,
  onNext,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          setErrorMsg('ขนาดไฟล์รูปภาพบางรายการเกิน 5MB');
          continue;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            onAddAdditionalImage(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
      setErrorMsg(null);
    }
  };

  const handleAddTag = (tag: string) => {
    if (!damageDescription.trim()) {
      onChangeDamageDescription(tag);
    } else if (!damageDescription.includes(tag)) {
      onChangeDamageDescription(`${damageDescription}, ${tag}`);
    }
  };

  const handleValidateAndNext = () => {
    if (!damageDescription.trim()) {
      setErrorMsg('กรุณาระบุรายละเอียดความเสียหายของตัวเครื่อง');
      return;
    }
    setErrorMsg(null);
    onNext();
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
            ขั้นตอนที่ 2 : ประเมินความเสียหาย
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            กรุณาระบุรายละเอียดความเสียหาย และอัปโหลดรูปภาพเพิ่มเติม
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Damage Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="damage-textarea" className="block text-sm font-semibold text-gray-800">
              รายละเอียดความเสียหาย <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-gray-400">
              {damageDescription.length}/500
            </span>
          </div>

          <div className="relative">
            <textarea
              id="damage-textarea"
              rows={4}
              maxLength={500}
              value={damageDescription}
              onChange={(e) => onChangeDamageDescription(e.target.value)}
              placeholder="เช่น หน้าจอแตก มีรอยร้าว, ระบบสัมผัสไม่ทำงาน, แบตเตอรี่เสื่อม, กล้องไม่ชัดเจน เป็นต้น"
              className="w-full bg-white border border-gray-300 hover:border-gray-400 focus:border-[#0B3B70] focus:ring-2 focus:ring-blue-100 rounded-xl p-4 text-gray-900 text-sm leading-relaxed transition-colors shadow-sm outline-none resize-none"
            />
          </div>

          {/* Quick Select Damage Chips */}
          <div className="mt-3">
            <span className="text-xs font-medium text-gray-500 flex items-center gap-1 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              คลิกเพื่อเลือกอาการเสียที่พบบ่อย:
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_DAMAGE_TAGS.map((tag, idx) => {
                const isSelected = damageDescription.includes(tag);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-[#0B3B70] border-blue-300 font-medium'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    + {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Additional Photos Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              รูปภาพเพิ่มเติม
            </label>
            <span className="text-xs text-gray-500">
              ({additionalImages.length} รูป)
            </span>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            aria-label="อัปโหลดรูปภาพความเสียหายเพิ่มเติม"
          />

          {/* Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Uploaded Photos */}
            {additionalImages.map((imgUrl, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 group shadow-2xs"
              >
                <img
                  src={imgUrl}
                  alt={`รูปความเสียหายที่ ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <button
                  type="button"
                  onClick={() => onRemoveAdditionalImage(index)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="ลบรูปนี้"
                  aria-label={`ลบรูปภาพที่ ${index + 1}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add Photo Slot 1 */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50/70 hover:bg-sky-50/50 rounded-2xl flex flex-col items-center justify-center p-3 cursor-pointer transition-colors group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1.5 group-hover:bg-blue-200 transition-colors">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-700">
                เพิ่มรูปภาพ
              </span>
            </div>

            {/* Add Photo Slot 2 or Sample Damage Quick Add */}
            <div
              onClick={() => {
                // If not all sample images used, add next sample image
                const nextSample = SAMPLE_DAMAGE_IMAGES.find(img => !additionalImages.includes(img)) || SAMPLE_DAMAGE_IMAGES[0];
                onAddAdditionalImage(nextSample);
              }}
              className="aspect-square border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50/70 hover:bg-sky-50/50 rounded-2xl flex flex-col items-center justify-center p-3 cursor-pointer transition-colors group text-center"
              title="คลิกเพื่อเลือกภาพตัวอย่างรอยแตก"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-1.5 group-hover:bg-blue-100 transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-700">
                เพิ่มรูปตัวอย่าง
              </span>
            </div>
          </div>
        </div>

        {/* Suggestion Info Box */}
        <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl flex items-start sm:items-center gap-3 text-sky-800">
          <div className="w-7 h-7 rounded-full bg-sky-200/80 text-sky-700 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4 stroke-[2.5]" />
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            แนะนำให้ถ่ายรูปในมุมที่ชัดเจน ทั้งด้านหน้า ด้านหลัง และจุดที่เสียหาย เพื่อความแม่นยำในการประเมินราคา
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-6 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ย้อนกลับ</span>
          </button>

          <button
            type="button"
            onClick={handleValidateAndNext}
            className="py-3 px-8 rounded-xl bg-[#0B57D0] hover:bg-[#0946a8] text-white font-semibold text-sm transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>ถัดไป</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
