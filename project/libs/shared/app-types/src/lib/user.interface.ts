import {City} from './city.enum';
import { UserContractor } from './user-contractor.interface';
import { UserCustomer } from './user-customer.interface';
import {UserRole} from './user-role.enum';

export interface User extends UserCustomer, UserContractor {
  _id?: string;
  fullName: string;
  email: string;
  city: City;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  dateBirth: Date;
}
