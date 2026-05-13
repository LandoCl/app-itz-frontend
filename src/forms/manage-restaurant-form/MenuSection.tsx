import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput";
import { Button } from "@/components/ui/button";

export default function MenuSection() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'menuItems'
    })
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Menu</h2>
                <FormDescription>
                    Crea tu menu, y asigna a cada item un nombre y un precio
                </FormDescription>
            </div>
            <FormField control={control}
                name='menuItems'
                render={() => (
                    <FormItem className="flex flex-col gap-2">
                        {
                            fields.map((_, index) => (
                                <MenuItemInput key={index} index={index} removeMenuItem={() => remove(index)} />
                            ))
                        }
                    </FormItem>
                )} />
            <Button className="bg-black text-white" type="button" onClick={() => append({ name: "", price: "" })}>Agregar al menu</Button>
        </div>
    )
}
