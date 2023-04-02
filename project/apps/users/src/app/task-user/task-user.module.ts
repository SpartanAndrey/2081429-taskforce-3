import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserModel, TaskUserSchema } from './task-user.model';
import { TaskUserRepository } from './task-user.repository';
import { Customer, TaskUserCustomerSchema } from './customer.model';

@Module({
  imports: [MongooseModule.forFeature([
    { 
      name: TaskUserModel.name, 
      schema: TaskUserSchema,
      discriminators: [
        { name: Customer.name, schema: TaskUserCustomerSchema}
      ],
    }
  ])],
  providers: [TaskUserRepository],
  exports: [TaskUserRepository]
})
export class TaskUserModule {}
