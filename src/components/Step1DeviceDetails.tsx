import React, { useRef } from 'react';
import { Smartphone, UploadCloud, X, ChevronRight, AlertCircle, Droplet } from 'lucide-react';
import { PHONE_MODELS, PhoneModelConfig } from '../utils/pricing';

interface Step1Props {
  selectedModel: string;
  onSelectModel: (model: string) => void;
  modelCode: string;
  onChangeModelCode: (code: string) => void;
  deviceImage: string;
  onSelectDeviceImage: (url: string) => void;
  onNext: () => void;
}

export const Step1DeviceDetails: React.FC<Step1Props> = ({
  selectedModel,
  onSelectModel,
  modelCode,
  onChangeModelCode,
  deviceImage,
  onSelectDeviceImage,
  onNext,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const currentModelConfig = PHONE_MODELS.find(m => m.name === selectedModel) || PHONE_MODELS[0];

  const handleModelChange = (modelName: string) => {
    onSelectModel(modelName);
    const found = PHONE_MODELS.find(m => m.name === modelName);
    if (found) {
      onChangeModelCode(found.modelCode);
      if (!deviceImage || PHONE_MODELS.some(m => m.defaultImage === deviceImage)) {
        onSelectDeviceImage(found.defaultImage);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('ขนาดไฟล์ภาพต้องไม่เกิน 5MB');
        return;
      }
      setErrorMsg(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSelectDeviceImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleValidateAndNext = () => {
    if (!selectedModel.trim()) {
      setErrorMsg('กรุณาเลือกรุ่นเครื่อง');
      return;
    }
    if (!modelCode.trim()) {
      setErrorMsg('กรุณากรอกโมเดลเครื่อง เช่น A2882');
      return;
    }
    if (!deviceImage) {
      setErrorMsg('กรุณาอัปโหลดรูปตัวเครื่องหรือเลือกจากตัวอย่าง');
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
            ขั้นตอนที่ 1 : รายละเอียดตัวเครื่อง
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            กรุณากรอกรายละเอียดของโทรศัพท์มือถือเพื่อเริ่มการตรวจสอบ
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Model Selection */}
        <div>
          <label htmlFor="model-select" className="block text-sm font-semibold text-gray-800 mb-2">
            รุ่นเครื่อง <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 focus:border-[#0B3B70] focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm transition-colors cursor-pointer shadow-sm outline-none"
            >
              {PHONE_MODELS.map((model) => (
                <option key={model.id} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Model Code */}
        <div>
          <label htmlFor="model-code-input" className="block text-sm font-semibold text-gray-800 mb-2">
            โมเดลเครื่อง <span className="text-red-500">*</span>
          </label>
          <input
            id="model-code-input"
            type="text"
            value={modelCode}
            onChange={(e) => onChangeModelCode(e.target.value)}
            placeholder="เช่น A2882"
            className="w-full bg-white border border-gray-300 hover:border-gray-400 focus:border-[#0B3B70] focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm transition-colors shadow-sm outline-none"
          />
        </div>

        {/* Device Image Upload & Preview */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            รูปตัวเครื่อง <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image Preview Box */}
            <div className="relative h-44 sm:h-48 border border-gray-200 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden p-2 group">
              {deviceImage ? (
                <>
                  <img
                    src={deviceImage}
                    alt="ตัวอย่างรูปตัวเครื่อง"
                    className="max-h-full max-w-full object-contain rounded-lg drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => onSelectDeviceImage('')}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="ลบรูปภาพ"
                    aria-label="ลบรูปภาพตัวเครื่อง"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="text-center text-gray-400 p-4">
                  <Smartphone className="w-10 h-10 mx-auto mb-2 stroke-1" />
                  <span className="text-xs">ยังไม่มีรูปภาพตัวเครื่อง</span>
                </div>
              )}
            </div>

            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="h-44 sm:h-48 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-sky-50/50 hover:bg-sky-50 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition-colors text-center group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                aria-label="เลือกไฟล์รูปภาพตัวเครื่อง"
              />
              <div className="w-12 h-12 rounded-full bg-blue-100/80 group-hover:bg-blue-200 transition-colors flex items-center justify-center text-blue-600 mb-2">
                <UploadCloud className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-sm font-semibold text-blue-900 group-hover:text-blue-700 mb-1">
                อัปโหลดรูปภาพ
              </span>
              <span className="text-xs text-gray-500">
                รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB
              </span>
            </div>
          </div>

          {/* Sample Uploaded Photos Selection */}
          <div className="mt-4">
            <span className="block text-xs font-semibold text-gray-700 mb-2">
              ตัวอย่างรูปที่อัปโหลด
            </span>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {currentModelConfig.sampleImages.map((sampleUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectDeviceImage(sampleUrl)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 overflow-hidden shrink-0 transition-all cursor-pointer p-1 bg-gray-50 ${
                    deviceImage === sampleUrl
                      ? 'border-[#0B3B70] ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100'
                  }`}
                  aria-label={`เลือกรูปภาพตัวอย่างมุมที่ ${idx + 1}`}
                >
                  <img
                    src={sampleUrl}
                    alt={`ตัวอย่างมุมที่ ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit / Next Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleValidateAndNext}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0B57D0] hover:bg-[#0946a8] active:bg-[#073682] text-white font-semibold text-base transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ถัดไป</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
