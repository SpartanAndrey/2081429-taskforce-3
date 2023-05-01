import { UserRole } from './user-role.enum';

export interface TokenPayload {
  sub: string;
  fullName: string;
  email: string;
  role: UserRole;
}
