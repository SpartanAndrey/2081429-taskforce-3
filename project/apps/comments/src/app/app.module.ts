import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CommentModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
