import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function DetailsSection() {
    const { control } = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Detalles</h2>
                <FormDescription>
                    Detalles del restaurante
                </FormDescription>
            </div>
            <FormField control={control}
                name="restauranteName"
                render={(
                    { field }) => (
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )}
            />
            <div className="flex gap-4">
                <FormField control={control}
                    name="city"
                    render={(
                        { field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Ciudad</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )} />
                <FormField control={control}
                    name="country"
                    render={(
                        { field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Pais</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )} />
            </div>
            <div className="flex gap-4">
                <FormField control={control}
                    name="deliverPrice"
                    render={({ field }) => (
                        <FormItem className="max-w-[25%] md:max-w-[50%]">
                            <FormLabel>Precio de entrega ($ pesos)</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" placeholder="100.00" />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )} />
            </div>
            <div className="flex gap-4">
                <FormField control={control}
                    name="estimatedDeliveryTime"
                    render={({ field }) => (
                        <FormItem className="max-w-[25%] md:max-w-[50%]">
                            <FormLabel>Tiempo de entrega estimado (minutos)</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" placeholder="30" />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

            </div>
        </div>

    )
}
