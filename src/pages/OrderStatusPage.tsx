import { useGetOrders } from "@/api/OrderApi"
import LoadingButton from "@/components/LoadingButton"
import OrderStatusHeader from "@/components/Orders/OrderStatusHeader"
import OrderStatusDetail from "@/components/Orders/OrderStatusDetail"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function OrderStatusPage() {
    const { data: orders, isLoading } = useGetOrders()

    if (isLoading) {
        return (<LoadingButton />)
    }
    if (!orders || orders.length === 0) {
        return (<h1>No hay ordenes para mostrar</h1>)
    }
    return (
        <div className="space-y-10">
            {
                orders.map((order) => (
                    <div className="flex flex-col space-y-10 bg-gray-50 p-10 rounded-lg" key={order._id}>
                        <OrderStatusHeader order={order} />
                        <div className="grid grid-cols-2">
                            <OrderStatusDetail order={order} />
                            <AspectRatio ratio={16 / 5}>
                                <img src={order.restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
                            </AspectRatio>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
