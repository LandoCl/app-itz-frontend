export type User = {
  auth0Id: string
  email: string
}

export type UpdateUser = {
  name: string
  address: string
  city: string
  country: string
}

export type BackEndUser = {
  _id: string
  email: string
  name: string
  address: string
  city: string
  country: string
}

export type MenuItem = {
  _id: string
  name: string
  price: number
}

export type Restaurante = {
  _id: string
  user: string
  restauranteName: string
  city: string
  country: string
  deliverPrice: string
  estimatedDeliveryTime: string
  cuisines: string[]
  menuItems: MenuItem[]
  imageUrl: string
  lastUpdated: string
}
export type RestauranteSearchResponse = {
  data: Restaurante[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

export type CartItem = {
  _id: string
  name: string
  price: number
  quantity: number
}

export type CheckOutSessionRequest = {
  cartItems: {
    menuItemId: string
    name: string
    quantity: string
  }[]
  deliveryDetails: {
    email: string
    name: string
    address: string
    city: string
    country: string
  }
  restaurantId: string
}

export type CheckoutSessionResponse = {
  url: string
}

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered"

export type Order = {
  _id: string
  restaurant: Restaurante
  user: User
  deliveryDetails: {
    name: string
    address: string
    city: string
    email: string
  }
  cartItems: {
    menuItemId: string
    name: string
    quantity: string
  }[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
}

export type OrderStatusInfo = {
  label: string
  value: OrderStatus
  progressiveValue: number
}

export type UpdateOrderStatusRequest = {
  orderId: string
  status: string
}
