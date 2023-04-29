import { UserRole } from "./user-role.enum";

export interface Subscriber {
  id?: string;
  email: string;
  fullName: string;
  role: UserRole;
}