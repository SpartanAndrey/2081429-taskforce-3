import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserModel, TaskUserSchema } from './task-user.model';
import { TaskUserRepository } from './task-user.repository';
import { TaskUserCustomerSchema } from './task-user-customer.model';
import { TaskUserContractorSchema } from './task-user-contractor.model';
import { UserRole } from '@project/shared/app-types';

@Module({
  imports: [MongooseModule.forFeature([
    { 
      name: TaskUserModel.name, 
      schema: TaskUserSchema,
      discriminators: [
        { name: UserRole.Customer, schema: TaskUserCustomerSchema},
        { name: UserRole.Contractor, schema: TaskUserContractorSchema},
      ],
    }
  ])],
  providers: [TaskUserRepository],
  exports: [TaskUserRepository]
})
export class TaskUserModule {}
