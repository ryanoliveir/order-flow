<template>
  <div class="h-full max-h-dvh w-full max-w-full overflow-hidden bg-slate-900 text-white flex flex-col">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-white">Pedidos</h1>
            <p class="text-sm text-slate-400">Distribuição de merenda</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-blue-400">{{ totalOrders }}</div>
            <div class="text-xs text-slate-400">Total</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Order List -->
    <main class="flex-1 pt-24 pb-24 px-4">
      <div class="max-w-xl mx-auto overflow-hidden">
        <div v-if="isLoading" class="text-center text-white">
          Loading orders...
        </div>
        
        <div v-else-if="visibleOrders.length === 0" class="fixed inset-0 flex items-center justify-center p-4">
          <div class="text-center">
            <div class="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">No orders in queue</h3>
            <p class="text-slate-400">All orders have been processed</p>
          </div>
        </div>

        <div v-else class="space-y-4 w-full max-w-full overflow-hidden">
          <TransitionGroup name="slide-up" tag="div" class="space-y-4 relative">
              <OrderCard v-for="(order, index) in visibleOrders" :key="order.id" :order="order" :index="index" />
          </TransitionGroup>
        </div>
      </div>
    </main>

    <!-- Fixed Next Button -->
    <div class="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700">
      <div class="max-w-3xl mx-auto p-4">
        <button
          @click="handleNextOrder"
          :disabled="visibleOrders.length === 0 || isPending"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <div class="flex items-center justify-center gap-2">
            <span>
              {{ isPending ? "Processando.." : "Próximo" }}
            </span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import OrderCard from '@/components/OrderCard.vue'
import { useApi } from '@/composables/useApi'
import type { Order } from '@/types/order'

const queryClient = useQueryClient()
const { fetchOrders, nextOrder } = useApi()


const { data: orders, isLoading } = useQuery<Order[]>({
  queryKey: ['orders'],
  queryFn: fetchOrders,
  // refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
})
const { mutate: nextOrderMutation, isPending } = useMutation({
  // mutationFn: moveOrderToEnd,
  mutationFn: nextOrder,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  },
})

const visibleOrders = computed(() => (orders?.value ?? []).slice(0, 7))
const totalOrders = computed(() => (orders?.value ?? []).length)

const handleNextOrder = () => {
  if (visibleOrders.value.length > 0) {
    nextOrderMutation(visibleOrders.value[0].id)
  }
}
</script>

<style scoped>
slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>