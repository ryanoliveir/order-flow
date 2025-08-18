import axios from "axios";
import type { Order } from "@/types/order";
import { formatOrders } from "@/utils";

// const API_URL = "http://192.168.15.90:3000";
const API_URL = "http://192.168.15.29:3000";

const api = axios.create({
  baseURL: API_URL,
});

export const useApi = () => {
  const fetchOrders = async (): Promise<Order[]> => {
    const response = await api.get("/orders");
    return formatOrders(response.data);
  };

  const moveOrderToEnd = async (orderId: string): Promise<Order> => {
    const response = await api.post(`/orders/${orderId}/next`);
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
    };
  };

  const nextOrder = async (orderId: string) => {
    const response = await api.get(`/next`, { params: { uuid: orderId } });
    if (response.status === 200) {
      console.log("Order successfully updated to the next stage");
    } else {
      console.error(`Failed to move to the next order ${orderId}`);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: string
  ): Promise<Order> => {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
    };
  };

  return {
    fetchOrders,
    moveOrderToEnd,
    updateOrderStatus,
    nextOrder
  };
};
