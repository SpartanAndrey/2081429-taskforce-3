import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { ReviewMemoryRepository } from './review-memory.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewMemoryRepository
  ) {}
  
  public async create(dto: CreateReviewDto) {
    const review = {...dto, userId: '', createdAt: dayjs('2023-03-26').toDate()};

    const reviewEntity = await new ReviewEntity(review);

    return this.reviewRepository.create(reviewEntity);
  }

  public async getReview(id: string) {
    return this.reviewRepository.findById(id);
  }

  public async delete(id: string) {
    return this.reviewRepository.destroy(id);
  }

}
