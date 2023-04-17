import { UserRole } from './user-role.enum';

export interface TokenPayload {
  sub: string;
  fullname: string;
  email: string;
  role: UserRole;
}
