import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';

@Module({
  imports: [TaskModule, PrismaModule, TaskCategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
