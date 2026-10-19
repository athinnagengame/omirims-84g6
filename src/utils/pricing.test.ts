import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectDamageItems,
  calculateTotalQuotation,
  formatCurrency,
  generateCaseNumber,
  getRelevantStock,
  INITIAL_INVENTORY,
  STANDARD_LABOR_FEE,
} from './pricing.ts';

test('detectDamageItems correctly detects screen and back camera damage', () => {
  const desc = 'หน้าจอแตก มีรอยร้าว, กล้องหลังไม่สามารถใช้งานได้';
  const items = detectDamageItems(desc, 'iPhone 14');

  assert.equal(items.length, 2);
  assert.equal(items[0].category, 'หน้าจอ');
  assert.equal(items[0].price, 5500);
  assert.equal(items[1].category, 'กล้องหลัง');
  assert.equal(items[1].price, 2500);
});

test('calculateTotalQuotation sums items and standard labor fee correctly', () => {
  const desc = 'หน้าจอแตก มีรอยร้าว, กล้องหลังไม่สามารถใช้งานได้';
  const items = detectDamageItems(desc, 'iPhone 14');
  const total = calculateTotalQuotation(items, STANDARD_LABOR_FEE);

  // 5500 (screen) + 2500 (camera) + 500 (labor) = 8500
  assert.equal(total, 8500);
});

test('formatCurrency formats baht amounts accurately', () => {
  assert.equal(formatCurrency(8500), '8,500 บาท');
  assert.equal(formatCurrency(500), '500 บาท');
});

test('generateCaseNumber creates valid case format', () => {
  const caseId = generateCaseNumber();
  assert.match(caseId, /^REP-\d{4}-\d{4}$/);
});

test('getRelevantStock filters parts matching iPhone 14 damages', () => {
  const desc = 'หน้าจอแตก กล้องหลังเสีย';
  const items = detectDamageItems(desc, 'iPhone 14');
  const relevant = getRelevantStock(INITIAL_INVENTORY, 'iPhone 14', items);

  assert.ok(relevant.length >= 2);
  const partNames = relevant.map(r => r.partName);
  assert.ok(partNames.some(p => p.includes('หน้าจอ iPhone 14')));
  assert.ok(partNames.some(p => p.includes('กล้องหลัง iPhone 14')));
});
