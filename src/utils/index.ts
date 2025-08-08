import type { Order, OrderRaw } from '@/types/order'


export const formatOrders = (rawOrders: OrderRaw[]): Order[] => {
  return rawOrders.map((raw): Order => ({
    id: raw.request_ID,
    studentName: raw.nome_aluno,
    orderType: raw.opcao,
    details: raw.matricula, 
    status: 'pending',
    createdAt: new Date(`${raw.data}T${raw.horario}`)
  }))
}