export type Address = {
  id: string
  fullName: string
  phone: string
  email: string
  addressLine: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
  createdAt: any   // ← NOT optional
}
