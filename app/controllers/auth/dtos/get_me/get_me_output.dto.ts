import { Role } from '#lib/domain/accounts/accounts'

export interface GetMeOutputDTO {
  id: string
  email: string
  avatar: string | null
  role: Role
}
