import type { OrderStatusInfo } from "@/api/types"

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Recibida", value: "placed", progressiveValue: 0 },
  {
    label: "Esperando confirmacion del restaurante",
    value: "paid",
    progressiveValue: 25,
  },
  { label: "En proceso", value: "inProgress", progressiveValue: 50 },
  { label: "En reparto", value: "outForDelivery", progressiveValue: 75 },
  { label: "Entregada", value: "delivered", progressiveValue: 100 },
]
