import { Module } from '@nestjs/common';
import { TaskTagController } from './task-tag.controller';
import { TaskTagService } from './task-tag.service';
import { TaskTagRepository } from './task-tag.repository';

@Module({
  controllers: [TaskTagController],
  providers: [TaskTagService, TaskTagRepository],
  exports: [TaskTagRepository]
})
export class TaskTagModule {}
