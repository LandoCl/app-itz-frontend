import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { toast } from "sonner"
import type { CheckOutSessionRequest, CheckoutSessionResponse, Order, UpdateOrderStatusRequest } from "./types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function useCreateCheckOutSession() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  const createCheckOutSessionRequest = async (
    checkOutSessionRequest: CheckOutSessionRequest
  ): Promise<CheckoutSessionResponse> => {
    const accessToken = await getAccessTokenSilently()

    const res = await fetch(
      API_BASE_URL + "/api/order/checkout/create-checkout-session",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkOutSessionRequest),
      }
    )
    if (!res.ok) {
      throw new Error("Error al crear la sesion de checkout de stripe")
    }
    return res.json()
  }
  return useMutation<CheckoutSessionResponse, Error, CheckOutSessionRequest>({
    mutationFn: (checkOutSessionRequest: CheckOutSessionRequest) =>
      createCheckOutSessionRequest(checkOutSessionRequest),
    onError: (err) => {
      toast.error("Error al crear la sesion de checkout en stripe")
      console.log(err)
      throw new Error("Error al crear la sesion de checkout en stripe")
    },
    onSuccess: (order) => {
      toast.success("Sesion de checkout en stripe creada correctamente")
      console.log(order)
      queryClient.invalidateQueries({ queryKey: ["order"] })
    },
  })
}

export function useGetOrders() {
  const { getAccessTokenSilently } = useAuth0();

  const getOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently()
    const res = await fetch(API_BASE_URL + '/api/order', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      throw new Error('Error al obtener los datos del restaurante')
    }
    return res.json()
  }
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrderRequest,
    refetchInterval: 5000
  })
}

export function useGetRestaurantOrders() {
  const { getAccessTokenSilently } = useAuth0()
  const getRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently()
    const res = await fetch(API_BASE_URL + '/api/order', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      throw new Error('Error al obtener los datos del restaurante')
    }
    return res.json()
  }
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: () => getRestaurantOrdersRequest(),
    refetchInterval: 5000
  })
}

export function useUpdateRestauranteOrder() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  const updateRestauranteOrderRequest = async (updateRestauranteOrderRequest: UpdateOrderStatusRequest): Promise<Order> => {
    const accessToken = await getAccessTokenSilently()
    const url = API_BASE_URL + '/api/order/' + updateRestauranteOrderRequest.orderId + '/status'
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: updateRestauranteOrderRequest.status })
    })
    if (!res.ok) {
      throw new Error("Error al actualizar el status de la orden")
    }
    return res.json()
  }
  return useMutation<Order, Error, UpdateOrderStatusRequest>({
    mutationFn: updateRestauranteOrderRequest,
    onError: (err) => {
      console.log(err)
      toast.error(err.toString())
      throw new Error("Error al actualziar el Restaurante")
    },
    onSuccess: () => {
      toast.success("Orden del restaurante actualizada")
      queryClient.invalidateQueries({ queryKey: ['restaurante'] })
    }
  })
}