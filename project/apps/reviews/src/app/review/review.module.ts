import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewMemoryRepository } from './review-memory.repository';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewMemoryRepository],
})
export class ReviewModule {}
