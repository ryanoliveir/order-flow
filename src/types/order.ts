export interface Order {
  id: string;
  studentName: string;
  orderType: string;
  details: string;
  status: string;
  createdAt: Date | string;
}