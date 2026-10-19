export interface PhoneModelConfig {
  id: string;
  name: string;
  modelCode: string;
  brand: string;
  defaultImage: string;
  sampleImages: string[];
}

export interface DamageItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  partId: string;
}

export interface InventoryItem {
  id: string;
  modelId: string;
  modelName: string;
  partName: string;
  stock: number;
  minStock: number;
  unit: string;
  location: string;
}

export interface RepairCase {
  id: string;
  caseNumber: string;
  createdAt: string;
  model: string;
  modelCode: string;
  deviceImage: string;
  additionalImages: string[];
  damageDescription: string;
  damageItems: DamageItem[];
  laborFee: number;
  totalPrice: number;
  status: 'pending' | 'in_progress' | 'completed' | 'delivered';
  customerName?: string;
  customerPhone?: string;
  technicianNote?: string;
}

// Clean self-contained SVG phone asset matching the purple iPhone 14 in the user reference image
export const SVG_PHONE_FRONT_BACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="100%" height="100%"><defs><linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%232b2538"/><stop offset="50%" stop-color="%231e1b27"/><stop offset="100%" stop-color="%2314121b"/></linearGradient><linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23433554"/><stop offset="40%" stop-color="%23876d9c"/><stop offset="100%" stop-color="%23271f34"/></linearGradient><linearGradient id="metalRim" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%237b6c8f"/><stop offset="100%" stop-color="%23383042"/></linearGradient></defs><rect width="320" height="320" fill="%23f8fafc" rx="16"/><g transform="translate(45, 25)"><rect x="0" y="0" width="105" height="215" rx="20" fill="url(%23metalRim)"/><rect x="3" y="3" width="99" height="209" rx="18" fill="url(%23purpleGrad)"/><rect x="10" y="10" width="46" height="46" rx="14" fill="%233a3346" stroke="%234e455c" stroke-width="1.5"/><circle cx="23" cy="23" r="10" fill="%2317151e" stroke="%235f5470" stroke-width="2"/><circle cx="23" cy="23" r="5" fill="%230c0b11"/><circle cx="43" cy="43" r="10" fill="%2317151e" stroke="%235f5470" stroke-width="2"/><circle cx="43" cy="43" r="5" fill="%230c0b11"/><circle cx="42" cy="20" r="3.5" fill="%23dfd5ea"/><circle cx="23" cy="43" r="2" fill="%230c0b11"/></g><g transform="translate(165, 25)"><rect x="0" y="0" width="105" height="215" rx="20" fill="url(%23metalRim)"/><rect x="2.5" y="2.5" width="100" height="210" rx="18" fill="%230a090e"/><rect x="5" y="5" width="95" height="205" rx="16" fill="url(%23screenGrad)"/><rect x="38" y="9" width="28" height="8" rx="4" fill="%230a090e"/></g></svg>`;

export const SVG_PHONE_BACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%"><rect width="200" height="200" fill="%23f1f5f9" rx="12"/><g transform="translate(50, 15)"><rect x="0" y="0" width="100" height="170" rx="18" fill="%232b2538"/><rect x="8" y="8" width="44" height="44" rx="12" fill="%23393245"/><circle cx="21" cy="21" r="9" fill="%2316131c" stroke="%235f5470" stroke-width="2"/><circle cx="39" cy="39" r="9" fill="%2316131c" stroke="%235f5470" stroke-width="2"/><circle cx="38" cy="18" r="3" fill="%23dfd5ea"/></g></svg>`;

export const SVG_PHONE_FRONT = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%"><rect width="200" height="200" fill="%23f1f5f9" rx="12"/><g transform="translate(50, 15)"><rect x="0" y="0" width="100" height="170" rx="18" fill="%230a090e"/><rect x="3" y="3" width="94" height="164" rx="16" fill="%2358456d"/><rect x="36" y="7" width="28" height="7" rx="3.5" fill="%230a090e"/></g></svg>`;

export const SVG_PHONE_SIDE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%"><rect width="200" height="200" fill="%23f1f5f9" rx="12"/><g transform="translate(85, 15)"><rect x="0" y="0" width="30" height="170" rx="10" fill="%23383042"/><rect x="-2" y="30" width="3" height="15" rx="1.5" fill="%235f5470"/><rect x="-2" y="52" width="3" height="22" rx="1.5" fill="%235f5470"/><rect x="-2" y="80" width="3" height="22" rx="1.5" fill="%235f5470"/></g></svg>`;

// Realistic cracked screen damage thumbnail SVG matching screenshot
export const SVG_DAMAGE_CRACKED_SCREEN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%"><rect width="200" height="200" fill="%231e2129"/><rect x="25" y="15" width="150" height="170" rx="12" fill="%23090b10" stroke="%23334155" stroke-width="2"/><g stroke="%23e2e8f0" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"><path d="M 40 40 L 70 80 L 110 70 L 150 110 L 170 140"/><path d="M 70 80 L 50 120 L 75 160"/><path d="M 110 70 L 120 40 L 140 25"/><path d="M 110 70 L 115 110 L 95 140 L 110 175"/><path d="M 150 110 L 135 150 L 160 170"/><path d="M 70 80 L 90 95 L 65 105"/><path d="M 120 40 L 95 30 L 75 45"/></g><circle cx="70" cy="80" r="12" fill="%23ffffff" fill-opacity="0.25"/><circle cx="110" cy="70" r="8" fill="%23ffffff" fill-opacity="0.2"/></svg>`;

// Damaged back camera / rear module SVG matching screenshot
export const SVG_DAMAGE_BACK_CAMERA = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%"><rect width="200" height="200" fill="%232b2538"/><rect x="30" y="25" width="140" height="150" rx="18" fill="%23393245" stroke="%234d445c" stroke-width="2"/><g transform="translate(45, 40)"><rect x="0" y="0" width="75" height="75" rx="18" fill="%232b2538" stroke="%23564c66" stroke-width="1.5"/><circle cx="24" cy="24" r="16" fill="%2315131a" stroke="%236e6282" stroke-width="2.5"/><path d="M 14 18 L 34 30 M 18 32 L 30 16" stroke="%23ffffff" stroke-width="1.5" stroke-linecap="round"/><circle cx="51" cy="51" r="16" fill="%2315131a" stroke="%236e6282" stroke-width="2.5"/><path d="M 42 46 L 60 56" stroke="%23ffffff" stroke-width="1.5" stroke-linecap="round"/><circle cx="51" cy="20" r="5" fill="%23e5dcf0"/></g></svg>`;

export const SAMPLE_DAMAGE_IMAGES = [
  SVG_DAMAGE_CRACKED_SCREEN,
  SVG_DAMAGE_BACK_CAMERA,
];

// Preset Phone Models
export const PHONE_MODELS: PhoneModelConfig[] = [
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    modelCode: 'A2882',
    brand: 'Apple',
    defaultImage: SVG_PHONE_FRONT_BACK,
    sampleImages: [
      SVG_PHONE_FRONT_BACK,
      SVG_PHONE_FRONT,
      SVG_PHONE_BACK,
      SVG_PHONE_SIDE,
    ]
  },
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    modelCode: 'A2890',
    brand: 'Apple',
    defaultImage: SVG_PHONE_FRONT_BACK,
    sampleImages: [
      SVG_PHONE_FRONT_BACK,
      SVG_PHONE_BACK,
    ]
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    modelCode: 'A3090',
    brand: 'Apple',
    defaultImage: SVG_PHONE_FRONT_BACK,
    sampleImages: [
      SVG_PHONE_FRONT_BACK,
      SVG_PHONE_BACK,
    ]
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    modelCode: 'A2633',
    brand: 'Apple',
    defaultImage: SVG_PHONE_FRONT_BACK,
    sampleImages: [
      SVG_PHONE_FRONT_BACK,
      SVG_PHONE_BACK,
    ]
  },
  {
    id: 'samsung-s23-ultra',
    name: 'Samsung Galaxy S23 Ultra',
    modelCode: 'SM-S918B',
    brand: 'Samsung',
    defaultImage: SVG_PHONE_FRONT_BACK,
    sampleImages: [
      SVG_PHONE_FRONT_BACK,
    ]
  },
  {
    id: 'samsung-s24',
    name: 'Samsung Galaxy S24',
    modelCode: 'SM-S921B',
    brand: 'Samsung',
    defaultImage: SVG_PHONE_FRONT_BACK,
    sampleImages: [
      SVG_PHONE_FRONT_BACK,
    ]
  }
];

// Initial Warehouse Inventory
export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'part-ip14-screen',
    modelId: 'iphone-14',
    modelName: 'iPhone 14',
    partName: 'หน้าจอ iPhone 14 (พร้อมใช้งาน)',
    stock: 2,
    minStock: 1,
    unit: 'ชิ้น',
    location: 'ตู้ A-01 ชั้น 2',
  },
  {
    id: 'part-ip14-cam',
    modelId: 'iphone-14',
    modelName: 'iPhone 14',
    partName: 'กล้องหลัง iPhone 14 (พร้อมใช้งาน)',
    stock: 3,
    minStock: 2,
    unit: 'ชิ้น',
    location: 'ตู้ B-03 ชั้น 1',
  },
  {
    id: 'part-ip14-bat',
    modelId: 'iphone-14',
    modelName: 'iPhone 14',
    partName: 'แบตเตอรี่ iPhone 14 (พร้อมใช้งาน)',
    stock: 5,
    minStock: 2,
    unit: 'ชิ้น',
    location: 'ตู้ C-02 ชั้น 3',
  },
  {
    id: 'part-ip14-back',
    modelId: 'iphone-14',
    modelName: 'iPhone 14',
    partName: 'ฝาหลังกระจก iPhone 14',
    stock: 4,
    minStock: 1,
    unit: 'ชิ้น',
    location: 'ตู้ D-01 ชั้น 2',
  },
  {
    id: 'part-ip13-screen',
    modelId: 'iphone-13',
    modelName: 'iPhone 13',
    partName: 'หน้าจอ iPhone 13 (พร้อมใช้งาน)',
    stock: 4,
    minStock: 2,
    unit: 'ชิ้น',
    location: 'ตู้ A-02 ชั้น 2',
  },
  {
    id: 'part-ip15-screen',
    modelId: 'iphone-15',
    modelName: 'iPhone 15',
    partName: 'หน้าจอ iPhone 15 (พร้อมใช้งาน)',
    stock: 1,
    minStock: 2,
    unit: 'ชิ้น',
    location: 'ตู้ A-04 ชั้น 1',
  },
  {
    id: 'part-s23u-screen',
    modelId: 'samsung-s23-ultra',
    modelName: 'Samsung Galaxy S23 Ultra',
    partName: 'หน้าจอ Dynamic AMOLED S23 Ultra',
    stock: 2,
    minStock: 1,
    unit: 'ชิ้น',
    location: 'ตู้ S-01 ชั้น 2',
  }
];

export const STANDARD_LABOR_FEE = 500;

export function detectDamageItems(description: string, modelName: string = 'iPhone 14'): DamageItem[] {
  const text = (description || '').toLowerCase();
  const items: DamageItem[] = [];

  const isScreenDamaged =
    text.includes('จอ') ||
    text.includes('สัมผัส') ||
    text.includes('หน้าจอ') ||
    text.includes('ทัช') ||
    text.includes('touch') ||
    text.includes('screen');

  const isBackCameraDamaged =
    text.includes('กล้องหลัง') ||
    text.includes('กล้อง') ||
    text.includes('camera') ||
    text.includes('เลนส์');

  const isBatteryDamaged =
    text.includes('แบต') ||
    text.includes('battery') ||
    text.includes('บวม') ||
    text.includes('เสื่อม');

  const isBackGlassDamaged =
    text.includes('ฝาหลัง') ||
    text.includes('กระจกหลัง') ||
    text.includes('บอดี้') ||
    text.includes('back glass');

  const isChargingDamaged =
    text.includes('ชาร์จ') ||
    text.includes('charge') ||
    text.includes('ก้นชาร์จ');

  const isSpeakerDamaged =
    text.includes('ลำโพง') ||
    text.includes('speaker') ||
    text.includes('เสียง');

  const isPro = modelName.includes('Pro') || modelName.includes('Ultra');

  if (isScreenDamaged) {
    items.push({
      id: 'damage-screen',
      category: 'หน้าจอ',
      name: 'หน้าจอ',
      description: 'เปลี่ยนหน้าจอแท้',
      price: isPro ? 7500 : 5500,
      icon: 'smartphone',
      partId: 'part-ip14-screen',
    });
  }

  if (isBackCameraDamaged) {
    items.push({
      id: 'damage-camera',
      category: 'กล้องหลัง',
      name: 'กล้องหลัง',
      description: 'เปลี่ยนกล้องหลัง',
      price: isPro ? 3500 : 2500,
      icon: 'camera',
      partId: 'part-ip14-cam',
    });
  }

  if (isBatteryDamaged) {
    items.push({
      id: 'damage-battery',
      category: 'แบตเตอรี่',
      name: 'แบตเตอรี่',
      description: 'เปลี่ยนแบตเตอรี่แท้ พร้อมซีลกันน้ำ',
      price: isPro ? 2400 : 1900,
      icon: 'battery',
      partId: 'part-ip14-bat',
    });
  }

  if (isBackGlassDamaged) {
    items.push({
      id: 'damage-back',
      category: 'ฝาหลัง',
      name: 'ฝาหลัง',
      description: 'เปลี่ยนกระจกฝาหลังแท้ด้วยเลเซอร์',
      price: isPro ? 2200 : 1500,
      icon: 'shield',
      partId: 'part-ip14-back',
    });
  }

  if (isChargingDamaged) {
    items.push({
      id: 'damage-charge',
      category: 'ระบบชาร์จ',
      name: 'พอร์ตชาร์จ',
      description: 'เปลี่ยนชุดแพรชาร์จและไมค์',
      price: 1200,
      icon: 'zap',
      partId: 'part-generic-charge',
    });
  }

  if (isSpeakerDamaged) {
    items.push({
      id: 'damage-speaker',
      category: 'ลำโพง',
      name: 'ลำโพงสนทนา / สปีคเกอร์',
      description: 'เปลี่ยนโมดูลลำโพงแท้',
      price: 900,
      icon: 'volume-2',
      partId: 'part-generic-speaker',
    });
  }

  if (items.length === 0 && text.trim().length > 0) {
    items.push({
      id: 'damage-screen',
      category: 'หน้าจอ',
      name: 'หน้าจอ',
      description: 'เปลี่ยนหน้าจอแท้',
      price: 5500,
      icon: 'smartphone',
      partId: 'part-ip14-screen',
    });
  }

  return items;
}

export function calculateTotalQuotation(items: DamageItem[], laborFee: number = STANDARD_LABOR_FEE): number {
  const partsSum = items.reduce((acc, curr) => acc + curr.price, 0);
  return partsSum + laborFee;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH').format(amount) + ' บาท';
}

export function generateCaseNumber(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `REP-${year}-${randomNum}`;
}

export function getRelevantStock(inventory: InventoryItem[], modelName: string, damageItems: DamageItem[]): InventoryItem[] {
  const cleanModel = modelName.trim().toLowerCase();
  return inventory.filter(item => {
    const itemModel = item.modelName.toLowerCase();
    const isModelMatch = itemModel.includes(cleanModel) || cleanModel.includes(itemModel);
    if (!isModelMatch) return false;

    if (damageItems.length === 0) return true;
    return damageItems.some(d => {
      const cat = d.category.toLowerCase();
      return item.partName.toLowerCase().includes(cat);
    });
  });
}
