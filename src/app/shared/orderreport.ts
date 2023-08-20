// OrderReport.ts
export interface OrderReport {
    overallSummary: OverallSummary;
    categoryBreakdown: CategoryBreakdown;
    voucherUsage: VoucherUsage;
    timePeriodBreakdown: TimePeriodBreakdown;
    controlBreakSections: ControlBreakSectionArrayWrapper;
    orderInfo: OrderInfoArrayWrapper;
  }
  
  export interface OverallSummary {
    totalOrders: number;
    totalRevenue: number;
    totalItemsSold: number;
    totalDiscountsApplied: number;
  }
  
  export interface CategoryBreakdown {
    totalBooksSold: number;
    totalEquipmentSold: number;
    totalRevenueFromBooks: number;
    totalRevenueFromEquipment: number;
  }
  
  export interface VoucherUsage {
    totalVouchersApplied: number;
    totalDiscountAmount: number;
  }
  
  export interface TimePeriodBreakdown {
    $id: string;
    timePeriods: TimePeriodArrayWrapper;
  }
  
  export interface TimePeriodArrayWrapper {
    $id: string;
    $values: TimePeriodData[];
  }
  
  export interface TimePeriodData {
    $id: string;
    timePeriod: string;
    totalRevenue: number;
    totalItemsSold: number;
  }
  
  
  
  export interface ControlBreakSectionArrayWrapper {
    $id: string;
    $values: ControlBreakSection[];
  }
  
  export interface ControlBreakSection {
    $id: string;
    sectionName: string;
    totalItemsSold: number;
    totalRevenue: number;
    controlItems: ControlItemArrayWrapper;
  }
  
  export interface ControlItemArrayWrapper {
    $id: string;
    $values: ControlItem[];
  }
  
  export interface ControlItem {
    $id: string;
    itemName: string;
    quantitySold: number;
    totalRevenue: number;
  }
  
  export interface OrderInfo {
    orderID: number;
    orderStatus: string;
    productType: string;
    productName: string;
    productPrice: number;
    quantity: number;
    totalPrice: number;
  }
  
  export interface OrderInfoArrayWrapper {
    $id: string;
    $values: OrderInfoItem[];
  }
  
  export interface OrderInfoItem {
    $id: string;
    orderID: number;
    orderStatus: string;
    productName: string;
    productPrice: number;
    productType: string;
    quantity: number;
    totalPrice: number;
  }
  
  