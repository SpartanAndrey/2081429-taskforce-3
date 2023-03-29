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
  public async get(@Param('id') id: string) {
    const existReview = await this.reviewService.getReview(id);

    return fillObject(ReviewRdo, existReview);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The review has been successfully deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.reviewService.delete(id);
  }

}
