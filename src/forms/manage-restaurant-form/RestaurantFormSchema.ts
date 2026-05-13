import { z } from "zod"

export const formSchema = z
  .object({
    restauranteName: z
      .string({
        required_error: "El nombre del restaurante es requerido",
      })
      .min(1, "El nombre del restaurante es requerido"),
    city: z
      .string({
        required_error: "La ciudad es requerida",
      })
      .min(1, "La ciudad es requerida"),
    country: z
      .string({
        required_error: "El país es requerido",
      })
      .min(1, "El país es requerido"),
    deliverPrice: z.coerce
      .number({
        required_error: "El precio de entrega es requerido",
        invalid_type_error: "El precio de entrega debe ser un número",
      })
      .min(0, "El precio de entrega no puede ser negativo"),
    estimatedDeliveryTime: z.coerce
      .number({
        required_error: "El tiempo de entrega es requerido",
        invalid_type_error: "El tiempo de entrega debe ser un número",
      })
      .min(0, "El tiempo de entrega no puede ser negativo"),
    cuisines: z
      .array(z.string())
      .nonempty("Por favor selecciona al menos un tipo de cocina"),
    menuItems: z.array(
      z.object({
        name: z
          .string({
            required_error: "El nombre del item es requerido",
          })
          .min(1, "El nombre del item es requerido"),
        price: z.coerce
          .number({
            required_error: "El precio es requerido",
            invalid_type_error: "El precio debe ser un número",
          })
          .min(0, "El precio no puede ser negativo"),
      })
    ),
    imageFile: z.instanceof(File, { message: "Imagen requerida" }).optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Se debe proporcionar un archivo de imagen o una URL de la imagen",
    path: ["imageFile"],
  })

export type RestaurantFormData = z.infer<typeof formSchema>
