import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { TaskTagModule } from '../task-tag/task-tag.module';

@Module({
  imports: [TaskTagModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository]
})
export class TaskModule {}
