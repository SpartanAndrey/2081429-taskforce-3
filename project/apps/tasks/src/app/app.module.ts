import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskTagModule } from './task-tag/task-tag.module';

@Module({
  imports: [TaskModule, PrismaModule, TaskTagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
