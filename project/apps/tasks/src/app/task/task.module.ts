import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { TaskCategoryModule } from '../task-category/task-category.module';

@Module({
  imports: [TaskCategoryModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository]
})
export class TaskModule {}
