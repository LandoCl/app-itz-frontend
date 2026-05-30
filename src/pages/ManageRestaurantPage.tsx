import { useCreateRestaurante, useGetRestaurante, useUpdateRestaurante } from "@/api/RestauranteApi"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import OrderItemsCard from "@/components/Orders/OrderItemsCard";
import { useGetRestaurantOrders } from "@/api/OrderApi";

export default function ManageRestaurantPage() {
    const createRestauranteRequest = useCreateRestaurante()
    const { data: restaurante, isLoading } = useGetRestaurante();
    const updateRestauranteRequest = useUpdateRestaurante();
    const { data: orders } = useGetRestaurantOrders();

    const isEditing = !!restaurante;
    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders"
                    className="border-orange-500 hover:bg-orange-500 hover:border-gray-400 mr-2">
                    Ordenes
                </TabsTrigger>
                <TabsTrigger value="manage-restaurant"
                    className="border-orange-500 hover:bg-orange-500 hover:border-gray-400 mr-2">
                    Administrar restaurante
                </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                {
                    orders?.map((order) => (
                        <OrderItemsCard order={order} key={order._id} />
                    ))
                }
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm restaurante={restaurante}
                    onSave={isEditing ? updateRestauranteRequest.mutate : createRestauranteRequest.mutate}
                    isLoading={isLoading || createRestauranteRequest.isPending || updateRestauranteRequest.isPending}
                />
            </TabsContent>
        </Tabs>
    )
}
