import { Role } from '#lib/domain/accounts/accounts'

export interface LoginOutputDTO {
  id: string
  email: string
  avatar: string | null
  role: Role
}
