<template>
  <div class="bg-white rounded-xl shadow-lg border border-slate-200 p-4 transition-all duration-300 hover:shadow-xl max-w-full w-full">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-4 mb-4">
          <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${getAvatarColor(index)}`">
            <span class="font-medium text-sm">
              {{ getInitials(order.studentName) }} 
             
            </span>
          </div>
          <div>
            <div class="flex  gap-1">
              <h3 class="font-semibold text-slate-800">{{ order.studentName }}</h3>
              <div class="align-bottom">
                <span class="text-xs text-slate-400">{{ matricula[0] }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <span
                v-for="(type, idx) in types"
                :key="idx"
                :class="`inline-flex items-center px-2 py-1 rounded-full font-medium ${typeColors[idx] || typeColors[0]}`"
              >
                {{ type.trim() }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- <div class="text-sm text-slate-600 mb-3">
          {{ order.details }}
        </div> -->
      </div>
      
      <div class="text-right ml-4">
        <div class="text-xs text-slate-400 mb-1">Pedido feito</div>
        <div class="text-sm font-medium text-slate-700">
          {{ formatTime(order.createdAt) }}
        </div>
        <div class="text-xs text-slate-400">Hoje</div>
      </div>
    </div>
    
    <div class="flex items-center justify-between pt-2 border-t border-slate-100">
      <div class="text-xs text-slate-400">
        #{{ String(index + 1).padStart(3, '0') }}
      </div>
      <div class="flex items-center gap-2">
        <!-- <div :class="`w-2 h-2 rounded-full ${getStatusColor(order.status)}`"></div> -->
        <span class="text-xs text-slate-400">
          ID: {{ order.id.slice(0,4) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Order } from '@/types/order'

interface Props {
  order: Order
  index: number
}

const props = defineProps<Props>()

const getInitials = (name: string): string => {
  console.log(name)
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "ready":
      return "bg-emerald-400"
    case "preparing":
      return "bg-yellow-400"
    case "received":
      return "bg-red-400"
    default:
      return "bg-gray-400"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "ready":
      return "Ready to serve"
    case "preparing":
      return "Preparing"
    case "received":
      return "Order received"
    default:
      return "Unknown"
  }
}

const getAvatarColor = (index: number) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
    "bg-indigo-100 text-indigo-600",
    "bg-pink-100 text-pink-600",
    "bg-orange-100 text-orange-600",
    "bg-teal-100 text-teal-600",
    "bg-red-100 text-red-600",
  ]
  return colors[index % colors.length]
}

const getTypeColor = (type: string) => {
  if (type.includes("Sobremesa") && type.includes("Lanche")) {
    return ["bg-blue-100 text-blue-700", "bg-orange-100 text-orange-700"]
  } else if (type.includes("Sobremesa")) {
    return ["bg-emerald-100 text-emerald-700"]
  } else if (type.includes("Lanche")) {
    return ["bg-blue-100 text-blue-700"]
  }
  return ["bg-gray-100 text-gray-700"]
}

const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(dateObj)
}

const types = computed(() => props.order.orderType.split("/"))
const matricula = computed(() => props.order.details.split("/"))
const typeColors = computed(() => getTypeColor(props.order.orderType))
</script>