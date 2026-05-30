import type { Order, OrderStatus } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "@base-ui/react"
import { Badge } from "../ui/badge"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ORDER_STATUS } from "@/config/order-status-config"
import { useUpdateRestauranteOrder } from "@/api/OrderApi"
import { useEffect, useState } from "react"

type Props = {
    order: Order;
}
export default function OrderItemsCard({ order }: Props) {
    const updateRestauranteOrderRequest = useUpdateRestauranteOrder()
    const [status, setStatus] = useState<OrderStatus>(order.status)

    useEffect(() => {
        setStatus(order.status)
    }, [order.status])

    const handleStatusChange = async (newStatus: OrderStatus) => {
        await updateRestauranteOrderRequest.mutate({
            orderId: order._id as string,
            status: newStatus
        })
        setStatus(newStatus);
    }
    const getTime = () => {
        const orderDateTime = new Date(order.createdAt)

        const hours = orderDateTime.getHours()
        const minutes = orderDateTime.getMinutes()

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

        return `${hours}:${paddedMinutes}`
    }
    return (
        <Card className="mb-2">
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>
                        Nombre del cliente
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.name}
                        </span>
                    </div>
                    <div>
                        Direccion de entrega
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.address},{order.deliveryDetails.city}
                        </span>
                    </div>
                    <div>
                        Tiempo de entrega:
                        <span className="ml-2 font-normal">
                            {getTime()}
                        </span>
                    </div>
                    <div>
                        Costo total:
                        <span className="ml-2 font-normal">
                            ${(order.totalAmount / 100).toFixed(2)}
                        </span>
                    </div>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    {
                        order.cartItems.map((cartItem, key) => (
                            <span key={key}>
                                <Badge variant="outline" className="mr-2">
                                    {cartItem.quantity}
                                </Badge>
                                {cartItem.name}
                            </span>
                        ))
                    }
                </div>
                <div className="flex flex-col space-y-1.5 mt-2 pt-2">
                    <Label htmlFor="status">¿Cuál es el status de la orden?</Label>
                    <Select value={status} onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
                        <SelectTrigger className="w-full max-w-75" id="status">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {ORDER_STATUS.map((status, key) => (
                                <SelectItem key={key} value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}
