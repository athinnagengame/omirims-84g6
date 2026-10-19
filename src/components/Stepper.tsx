import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  maxCompletedStep: number;
}

interface StepDef {
  number: number;
  label: string;
}

const STEPS: StepDef[] = [
  { number: 1, label: 'รายละเอียดตัวเครื่อง' },
  { number: 2, label: 'ประเมินความเสียหาย' },
  { number: 3, label: 'ประเมินราคาซ่อม' },
];

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  onStepClick,
  maxCompletedStep,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6 print:hidden">
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm px-4 sm:px-12 py-5 sm:py-6">
        <div className="relative flex items-center justify-between">
          {/* Connecting Line */}
          <div className="absolute left-[12%] right-[12%] top-5 sm:top-5 h-0.5 bg-blue-100 -z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width:
                  currentStep === 1
                    ? '0%'
                    : currentStep === 2
                    ? '50%'
                    : '100%',
              }}
            />
          </div>

          {/* Steps */}
          {STEPS.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;
            const isClickable = step.number <= maxCompletedStep + 1;

            return (
              <div
                key={step.number}
                className="flex flex-col items-center z-10 select-none group"
              >
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => onStepClick && isClickable && onStepClick(step.number)}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-200 ${
                    isCompleted
                      ? 'bg-[#0B3B70] text-white shadow-sm hover:opacity-90'
                      : isCurrent
                      ? 'bg-[#0B3B70] text-white ring-4 ring-blue-100 shadow-md'
                      : 'bg-blue-50/80 text-blue-400 border border-blue-200'
                  } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                  aria-label={`ขั้นตอนที่ ${step.number} : ${step.label}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </button>
                <span
                  className={`mt-2.5 text-xs sm:text-sm font-medium tracking-tight text-center transition-colors ${
                    isCurrent
                      ? 'text-[#0B3B70] font-bold'
                      : isCompleted
                      ? 'text-gray-700'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
