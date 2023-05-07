import { Body, Controller, Post, Get, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { fillObject } from '@project/util/util-core';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  @Post('create')
  public async create(@Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.create(dto);
    return fillObject(ReviewRdo, newReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'The review found.'
  })
  @Get(':id') 
  public async get(@Param('id') id: number) {
    const existReview = await this.reviewService.getReview(id);

    return fillObject(ReviewRdo, existReview);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The review has been successfully deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    await this.reviewService.delete(id);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'The reviews found.'
  })
  @Get('/:contractorId/data')
  async indexExecutorReviews(@Param('contractorId') contractorId: string) {
    const reviews = await this.reviewService.getByContractorId(contractorId);
    return fillObject(ReviewRdo, reviews);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get('/:contractorId/sum') 
  public async getRatingSum(@Param('contractorId') contractorId: string) {
    const ratingSum = await this.reviewService.getRatingSum(contractorId);

    return ratingSum;
  }

}
