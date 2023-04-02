import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserModel, TaskUserSchema } from './task-user.model';
import { TaskUserRepository } from './task-user.repository';
import { TaskUserCustomerModel, TaskUserCustomerSchema } from './task-user-customer.model';

@Module({
  imports: [MongooseModule.forFeature([
    { 
      name: TaskUserModel.name, 
      schema: TaskUserSchema,
      discriminators: [
        { name: TaskUserCustomerModel.name, schema: TaskUserCustomerSchema}
      ],
    }
  ])],
  providers: [TaskUserRepository],
  exports: [TaskUserRepository]
})
export class TaskUserModule {}
