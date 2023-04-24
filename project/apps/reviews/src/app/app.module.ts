import { Module } from '@nestjs/common';
import { ReviewModule } from './review/review.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ReviewModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
