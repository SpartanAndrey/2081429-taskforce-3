import {UserCity} from './user-city.enum';
import {UserRole} from './user-role.enum';

export interface User {
  _id?: string;
  fullName: string;
  email: string;
  city: UserCity;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  dateBirth: Date;
}
