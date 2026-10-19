import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { Step1DeviceDetails } from './components/Step1DeviceDetails';
import { Step2DamageAssessment } from './components/Step2DamageAssessment';
import { Step3Quotation } from './components/Step3Quotation';
import { WarehouseModal } from './components/WarehouseModal';
import { PrintQuotationModal } from './components/PrintQuotationModal';
import { CasesListModal } from './components/CasesListModal';
import { Footer } from './components/Footer';
import {
  PHONE_MODELS,
  INITIAL_INVENTORY,
  SAMPLE_DAMAGE_IMAGES,
  detectDamageItems,
  calculateTotalQuotation,
  generateCaseNumber,
  RepairCase,
  InventoryItem,
} from './utils/pricing';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation & Step state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(1);
  const [currentView, setCurrentView] = useState<'wizard' | 'cases' | 'warehouse'>('wizard');

  // Step 1: Device Details
  const [selectedModel, setSelectedModel] = useState<string>('iPhone 14');
  const [modelCode, setModelCode] = useState<string>('A2882');
  const [deviceImage, setDeviceImage] = useState<string>(PHONE_MODELS[0].defaultImage);

  // Step 2: Damage Assessment
  const [damageDescription, setDamageDescription] = useState<string>(
    'หน้าจอแตก มีรอยร้าว, กล้องหลังไม่สามารถใช้งานได้'
  );
  const [additionalImages, setAdditionalImages] = useState<string[]>([
    SAMPLE_DAMAGE_IMAGES[0],
    SAMPLE_DAMAGE_IMAGES[1],
  ]);

  // Inventory & Submitted Cases
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [cases, setCases] = useState<RepairCase[]>([
    {
      id: 'case-demo-1',
      caseNumber: 'REP-2026-1042',
      createdAt: '19 ต.ค. 2569 11:30 น.',
      model: 'iPhone 14',
      modelCode: 'A2882',
      deviceImage: PHONE_MODELS[0].defaultImage,
      additionalImages: [SAMPLE_DAMAGE_IMAGES[0], SAMPLE_DAMAGE_IMAGES[1]],
      damageDescription: 'หน้าจอแตก มีรอยร้าว, กล้องหลังไม่สามารถใช้งานได้',
      damageItems: detectDamageItems('หน้าจอแตก มีรอยร้าว, กล้องหลังไม่สามารถใช้งานได้', 'iPhone 14'),
      laborFee: 500,
      totalPrice: 8500,
      status: 'pending',
      customerName: 'สมชาย ใจดี',
      customerPhone: '081-234-5678',
    },
  ]);

  // Modals state
  const [isWarehouseOpen, setIsWarehouseOpen] = useState<boolean>(false);
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);
  const [printCaseData, setPrintCaseData] = useState<RepairCase | null>(null);
  const [successCaseNumber, setSuccessCaseNumber] = useState<string | null>(null);

  // Read URL query parameters on mount for quick navigation/testing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get('step');
    if (stepParam === '2') {
      setCurrentStep(2);
      setMaxCompletedStep(2);
    } else if (stepParam === '3') {
      setCurrentStep(3);
      setMaxCompletedStep(3);
    }
    const viewParam = params.get('view');
    if (viewParam === 'cases') setCurrentView('cases');
    if (viewParam === 'warehouse') setIsWarehouseOpen(true);
  }, []);

  // Compute damage items dynamically based on description & model
  const damageItems = detectDamageItems(damageDescription, selectedModel);

  // Low stock counter for header badge
  const lowStockCount = inventory.filter((item) => item.stock <= item.minStock).length;

  // Handlers for step progression
  const handleStep1Next = () => {
    setCurrentStep(2);
    setMaxCompletedStep((prev) => Math.max(prev, 2));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
    setMaxCompletedStep((prev) => Math.max(prev, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Additional Image Handlers
  const handleAddAdditionalImage = (url: string) => {
    setAdditionalImages((prev) => [...prev, url]);
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Inventory update handler
  const handleUpdateStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  const handleResetStock = () => {
    setInventory(INITIAL_INVENTORY);
  };

  // Case submission handler
  const handleSubmitCase = (customerName: string, customerPhone: string) => {
    const newCaseNum = generateCaseNumber();
    const totalPrice = calculateTotalQuotation(damageItems);

    const now = new Date();
    const formattedDate = `${now.getDate()} ${
      [
        'ม.ค.',
        'ก.พ.',
        'มี.ค.',
        'เม.ย.',
        'พ.ค.',
        'มิ.ย.',
        'ก.ค.',
        'ส.ค.',
        'ก.ย.',
        'ต.ค.',
        'พ.ย.',
        'ธ.ค.',
      ][now.getMonth()]
    } ${now.getFullYear() + 543} ${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')} น.`;

    const newCase: RepairCase = {
      id: `case-${Date.now()}`,
      caseNumber: newCaseNum,
      createdAt: formattedDate,
      model: selectedModel,
      modelCode: modelCode,
      deviceImage,
      additionalImages,
      damageDescription,
      damageItems,
      laborFee: 500,
      totalPrice,
      status: 'pending',
      customerName,
      customerPhone,
    };

    // Deduct stock for matching damaged parts
    setInventory((prev) =>
      prev.map((item) => {
        const matchesDamage = damageItems.some((d) => d.partId === item.id);
        if (matchesDamage && item.stock > 0) {
          return { ...item, stock: item.stock - 1 };
        }
        return item;
      })
    );

    setCases((prev) => [newCase, ...prev]);
    setSuccessCaseNumber(newCaseNum);
  };

  const handleOpenPrintCurrent = () => {
    setPrintCaseData({
      id: 'current-preview',
      caseNumber: 'REP-2026-1042',
      createdAt: new Date().toLocaleDateString('th-TH'),
      model: selectedModel,
      modelCode: modelCode,
      deviceImage,
      additionalImages,
      damageDescription,
      damageItems,
      laborFee: 500,
      totalPrice: calculateTotalQuotation(damageItems),
      status: 'pending',
      customerName: 'สมชาย ใจดี',
      customerPhone: '081-234-5678',
    });
    setIsPrintOpen(true);
  };

  const handleOpenPrintForCase = (c: RepairCase) => {
    setPrintCaseData(c);
    setIsPrintOpen(true);
  };

  const handleUpdateCaseStatus = (caseId: string, status: RepairCase['status']) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status } : c))
    );
  };

  const startNewInspection = () => {
    setCurrentStep(1);
    setMaxCompletedStep(1);
    setSuccessCaseNumber(null);
    setCurrentView('wizard');
    setSelectedModel('iPhone 14');
    setModelCode('A2882');
    setDeviceImage(PHONE_MODELS[0].defaultImage);
    setDamageDescription('');
    setAdditionalImages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F9] text-gray-900 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'warehouse') {
            setIsWarehouseOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        caseCount={cases.length}
        lowStockCount={lowStockCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-6 sm:py-8 px-4">
        {currentView === 'cases' ? (
          <CasesListModal
            cases={cases}
            onSelectCase={handleOpenPrintForCase}
            onNewCase={startNewInspection}
            onUpdateStatus={handleUpdateCaseStatus}
          />
        ) : (
          <div className="w-full">
            {/* Step Indicator */}
            <Stepper
              currentStep={currentStep}
              onStepClick={handleStepClick}
              maxCompletedStep={maxCompletedStep}
            />

            {/* Step 1: Device Details */}
            {currentStep === 1 && (
              <Step1DeviceDetails
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
                modelCode={modelCode}
                onChangeModelCode={setModelCode}
                deviceImage={deviceImage}
                onSelectDeviceImage={setDeviceImage}
                onNext={handleStep1Next}
              />
            )}

            {/* Step 2: Damage Assessment */}
            {currentStep === 2 && (
              <Step2DamageAssessment
                damageDescription={damageDescription}
                onChangeDamageDescription={setDamageDescription}
                additionalImages={additionalImages}
                onAddAdditionalImage={handleAddAdditionalImage}
                onRemoveAdditionalImage={handleRemoveAdditionalImage}
                onBack={handleStep2Back}
                onNext={handleStep2Next}
              />
            )}

            {/* Step 3: Repair Quotation */}
            {currentStep === 3 && (
              <Step3Quotation
                selectedModel={selectedModel}
                modelCode={modelCode}
                deviceImage={deviceImage}
                damageDescription={damageDescription}
                additionalImages={additionalImages}
                damageItems={damageItems}
                inventory={inventory}
                onBack={handleStep3Back}
                onOpenWarehouse={() => setIsWarehouseOpen(true)}
                onOpenPrint={handleOpenPrintCurrent}
                onSubmitCase={handleSubmitCase}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Warehouse Modal */}
      <WarehouseModal
        isOpen={isWarehouseOpen}
        onClose={() => setIsWarehouseOpen(false)}
        inventory={inventory}
        onUpdateStock={handleUpdateStock}
        onResetStock={handleResetStock}
      />

      {/* Print Quotation Modal */}
      {isPrintOpen && printCaseData && (
        <PrintQuotationModal
          isOpen={isPrintOpen}
          onClose={() => setIsPrintOpen(false)}
          caseNumber={printCaseData.caseNumber}
          model={printCaseData.model}
          modelCode={printCaseData.modelCode}
          damageDescription={printCaseData.damageDescription}
          damageItems={printCaseData.damageItems}
          customerName={printCaseData.customerName}
          customerPhone={printCaseData.customerPhone}
          deviceImage={printCaseData.deviceImage}
        />
      )}

      {/* Success Notification Modal */}
      {successCaseNumber && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl text-center border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              ส่งเคสงานซ่อมสำเร็จแล้ว!
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              ระบบได้บันทึกข้อมูลและปรับปรุงสต็อกอะไหล่เรียบร้อยแล้ว
            </p>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 mb-5 text-center">
              <span className="text-xs text-emerald-800 font-semibold block mb-0.5">
                เลขที่เคสงานซ่อมของคุณ
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-emerald-700 tracking-wider">
                #{successCaseNumber}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setSuccessCaseNumber(null);
                  handleOpenPrintCurrent();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold cursor-pointer"
              >
                พิมพ์ใบประเมินราคา
              </button>

              <button
                type="button"
                onClick={() => {
                  setSuccessCaseNumber(null);
                  setCurrentView('cases');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B57D0] hover:bg-[#0946a8] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>ดูรายการเคสทั้งหมด</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
