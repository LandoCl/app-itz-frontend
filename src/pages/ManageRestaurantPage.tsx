import { useCreateRestaurante, useGetRestaurante, useUpdateRestaurante } from "@/api/RestauranteApi"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

export default function ManageRestaurantPage() {
    const createRestauranteRequest = useCreateRestaurante()
    const { data: restaurante, isLoading } = useGetRestaurante();
    const updateRestauranteRequest = useUpdateRestaurante();

    const isEditing = !!restaurante;
    return (
        <ManageRestaurantForm restaurante={restaurante}
            onSave={isEditing ? updateRestauranteRequest.mutate : createRestauranteRequest.mutate}
            isLoading={isLoading}
        />
    )
}
