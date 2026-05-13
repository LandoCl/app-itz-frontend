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
