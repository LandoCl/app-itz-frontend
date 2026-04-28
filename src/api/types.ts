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
