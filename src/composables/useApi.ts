import axios from 'axios'
import type { Order } from '@/types/order'

const API_BASE = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE,
})

export const useApi = () => {
  const fetchOrders = async (): Promise<Order[]> => {
    const response = await api.get('/orders')
    return response.data.map((order: any) => ({
      ...order,
      createdAt: new Date(order.createdAt)
    }))
  }

  const moveOrderToEnd = async (orderId: string): Promise<Order> => {
    const response = await api.post(`/orders/${orderId}/next`)
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
    const response = await api.patch(`/orders/${orderId}/status`, { status })
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt)
    }
  }

  return {
    fetchOrders,
    moveOrderToEnd,
    updateOrderStatus
  }
}