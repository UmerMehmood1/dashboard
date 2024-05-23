export interface OrderType {
    id: number;
    customerName: string;
    productName: string;
    quantity: number;
    totalPrice: number;
    orderDate: string; // Assuming it's a string representing a date
    status: number;
  }