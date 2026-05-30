"use client"
import type { Order } from "@/api/types"
import { Progress } from "../ui/progress"
import { ORDER_STATUS } from "@/config/order-status-config"
import OrderStatusMessage from "./OrderStatusMessage"
type Props = {
    order: Order
}
export default function OrderStatusHeader({ order }: Props) {
    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt)

        created.setMinutes(
            created.getMinutes() + parseInt(order.restaurant.estimatedDeliveryTime)
        )

        const hours = created.getHours()
        const minutes = created.getMinutes()

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

        return `${hours}:${paddedMinutes}`
    }
    const getOrderStatusInfo = () => {
        return (
            ORDER_STATUS.find((status) => status.value === order.status)
        )
    }
    return (
        <>
            <h1 className="text-2xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span>Order Status: {getOrderStatusInfo()?.label}</span>
                <OrderStatusMessage
                    status={getOrderStatusInfo()?.value || "placed"} />
                <span>Expected by: {getExpectedDelivery()}</span>
            </h1>
            <Progress className="animate-pulse border-orange-500 border-2" value={getOrderStatusInfo()?.progressiveValue || 0}></Progress>
        </>
    )
}
