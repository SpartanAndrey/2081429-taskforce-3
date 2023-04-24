import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) {}
  
  public async create(dto: CreateReviewDto) {
    const review = {...dto, userId: '', createdAt: dayjs('2023-03-26').toDate()};

    const reviewEntity = await new ReviewEntity(review);

    return this.reviewRepository.create(reviewEntity);
  }

  public async getReview(id: number) {
    return this.reviewRepository.findById(id);
  }

  async getByContractorId(contractorId: string) {
    return this.reviewRepository.findByContractorId(contractorId);
  }

  public async delete(id: number) {
    return this.reviewRepository.destroy(id);
  }

  async deletByContractorId(contractorId: string) {
    return this.reviewRepository.destroyByContractorId(contractorId);
  }

}
