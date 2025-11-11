import { Table, Area } from '@/types';

export const areas: Area[] = [
  { id: 'area-1', name: 'Main Hall', outletId: 'outlet-1' },
  { id: 'area-2', name: 'Garden', outletId: 'outlet-1' },
  { id: 'area-3', name: 'Private Dining', outletId: 'outlet-1' },
];

export const tables: Table[] = [
  { id: 'table-1', name: 'T1', areaId: 'area-1', capacity: 2, shape: 'round', status: 'vacant' },
  { id: 'table-2', name: 'T2', areaId: 'area-1', capacity: 4, shape: 'square', status: 'occupied' },
  { id: 'table-3', name: 'T3', areaId: 'area-1', capacity: 4, shape: 'square', status: 'vacant' },
  { id: 'table-4', name: 'T4', areaId: 'area-1', capacity: 6, shape: 'square', status: 'reserved' },
  { id: 'table-5', name: 'T5', areaId: 'area-1', capacity: 2, shape: 'round', status: 'vacant' },
  { id: 'table-6', name: 'T6', areaId: 'area-2', capacity: 4, shape: 'round', status: 'occupied' },
  { id: 'table-7', name: 'T7', areaId: 'area-2', capacity: 6, shape: 'square', status: 'vacant' },
  { id: 'table-8', name: 'T8', areaId: 'area-2', capacity: 4, shape: 'square', status: 'vacant' },
  { id: 'table-9', name: 'PD1', areaId: 'area-3', capacity: 8, shape: 'square', status: 'vacant' },
  { id: 'table-10', name: 'PD2', areaId: 'area-3', capacity: 10, shape: 'square', status: 'cleaning' },
];

export const getTablesByArea = (areaId: string) => tables.filter(t => t.areaId === areaId);
export const getTableById = (id: string) => tables.find(t => t.id === id);
